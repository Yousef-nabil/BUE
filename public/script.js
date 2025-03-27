// Fetch current step from backend
async function fetchCurrentStep() {
    try {
        const response = await fetch('https://bue.vercel.app/api/hello');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data; // Assuming the response contains step information
    } catch (error) {
        console.error('Error fetching current step:', error);
        return { step: 0 }; // Fallback value
    }
}

async function sendMotorCommand(motorType, angle, direction) {
    try {
        // Determine the correct API endpoint and payload based on motor type
        const apiEndpoints = {
            nema17: 'https://bue.vercel.app/api/motor_one',
            nema23: 'https://bue.vercel.app/api/motor_two'
        };

        const payloadMap = {
            nema17: {
                motor_one_angle: angle.toString(),
                motor_one_dircetion: direction === 'anticlockwise' ? 'anti-clock-wise' : 'clock-wise'
            },
            nema23: {
                motor_two_angle: angle.toString(),
                motor_two_dircetion: direction === 'clockwise' ? 'clock-wise' : 'anti-clock-wise'
            }
        };

        const endpoint = apiEndpoints[motorType];
        const payload = payloadMap[motorType];

        console.log('Sending payload:', payload);

        // Send PATCH request
        const response = await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const result = await response.json();
        console.log(`${motorType.toUpperCase()} API Response:`, result);
        
        return result;
    } catch (error) {
        console.error(`Error sending command to ${motorType}:`, error);
        alert(`Failed to send command to ${motorType}. Check console for details.`);
        throw error;
    }
}

function getSelectedDirection(motorType) {
    const directionInputs = document.querySelectorAll(`input[name="${motorType}-direction"]`);
    for (let input of directionInputs) {
        if (input.checked) {
            return input.value;
        }
    }
    return null;
}

async function pressAction(motorType) {
    console.log(`Press action called for ${motorType}`);

    // Get angle from input
    const angleInput = document.getElementById(`${motorType}-angle`);
    const angle = angleInput.value ? parseInt(angleInput.value) : 0;

    // Get selected direction
    const direction = getSelectedDirection(motorType);

    // Validate inputs
    if (!direction) {
        alert('Please select a direction');
        return;
    }
    if (angle === 0) {
        alert('Please enter a non-zero angle');
        return;
    }

    try {
        // Send command to API
        const apiResponse = await sendMotorCommand(motorType, angle, direction);

        // Fetch current step
        const stepData = await fetchCurrentStep();

        // Update step display
        const stepOutput = document.getElementById(`${motorType}-step`);
        let x;
        if(motorType==="NEMA17")
            x="motor_one_steps";
        else
        x="motor_two_steps";

        stepOutput.textContent = stepData[0].x || 0;

        // Display details
        alert(`${motorType.toUpperCase()} Motor Details:
Direction: ${direction}
Angle: ${angle} degrees
Current Stepp: ${JSON.stringify(stepData)|| 0}
API Response: ${JSON.stringify(apiResponse, null, 2)}`);
    } catch (error) {
        console.error('Press action failed:', error);
    }
}

// Optional: Log when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
});