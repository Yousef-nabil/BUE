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

        // Display details
        alert(`${motorType.toUpperCase()} Motor Details:
Direction: ${direction}
Angle: ${angle} degrees
API Response: ${JSON.stringify(apiResponse, null, 2)}`);
    } catch (error) {
        console.error('Press action failed:', error);
    }
}

function resetMotor(motorType) {
    console.log(`Reset called for ${motorType}`);

    // Reset angle input
    const angleInput = document.getElementById(`${motorType}-angle`);
    angleInput.value = '';

    // Deselect direction radio buttons
    const directionInputs = document.querySelectorAll(`input[name="${motorType}-direction"]`);
    directionInputs.forEach(input => input.checked = false);
}

// Optional: Log when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
});