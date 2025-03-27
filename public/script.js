// Motor state tracking
const motorStates = {
    nema17: {
        direction: null,
        angle: 0,
        step: 0
    },
    nema23: {
        direction: null,
        angle: 0,
        step: 0
    }
};

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

        // Send PATCH request
        const response = await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(`${motorType.toUpperCase()} API Response:`, result);
        
        return result;
    } catch (error) {
        console.error(`Error sending command to ${motorType}:`, error);
        alert(`Failed to send command to ${motorType}. Check console for details.`);
    }
}

function rotateMotor(motorType, direction) {
    console.log(`Rotate function called for ${motorType} in ${direction} direction`);

    // Get references to input and output elements
    const angleInput = document.getElementById(`${motorType}-angle`);
    const stepOutput = document.getElementById(`${motorType}-step`);

    // Parse angle input or default to 0
    const angle = angleInput.value ? parseInt(angleInput.value) : 0;

    // Update motor state
    const motorState = motorStates[motorType];
    motorState.direction = direction;
    motorState.angle = angle;

    // Update step counter
    motorState.step += (direction === 'clockwise') ? 1 : -1;

    // Update UI
    stepOutput.textContent = motorState.step;

    // Optional: Additional logging
    console.log(`${motorType.toUpperCase()} state:`, motorState);
}

async function pressAction(motorType) {
    console.log(`Press action called for ${motorType}`);

    const motorState = motorStates[motorType];

    // Validate motor state before sending command
    if (!motorState.direction || motorState.angle === 0) {
        alert('Please set direction and angle before pressing');
        return;
    }

    try {
        // Send command to API
        const apiResponse = await sendMotorCommand(
            motorType, 
            motorState.angle, 
            motorState.direction
        );

        // Display motor state and API response
        alert(`${motorType.toUpperCase()} Motor Details:
Direction: ${motorState.direction}
Angle: ${motorState.angle} degrees
Current Step: ${motorState.step}
API Response: ${JSON.stringify(apiResponse, null, 2)}`);
    } catch (error) {
        console.error('Press action failed:', error);
    }
}

function resetMotor(motorType) {
    console.log(`Reset called for ${motorType}`);

    // Reset input and output elements
    const angleInput = document.getElementById(`${motorType}-angle`);
    const stepOutput = document.getElementById(`${motorType}-step`);

    // Reset motor state
    motorStates[motorType] = {
        direction: null,
        angle: 0,
        step: 0
    };

    // Clear input and reset step display
    angleInput.value = '';
    stepOutput.textContent = '0';
}

// Optional: Log when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
});