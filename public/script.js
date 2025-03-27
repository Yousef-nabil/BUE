// Debug log to verify script is loading
console.log("External script loaded successfully!");

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

function rotateMotor(motorType, direction) {
   // console.log(Rotate function,] called for ${motorType} in ${direction} direction);

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
    //console.log(${motorType.toUpperCase()} state:, motorState);
}

function pressAction(motorType) {
    //console.log(Press action called for ${motorType});

    const motorState = motorStates[motorType];

    // Display motor state details
    alert(`${motorType.toUpperCase()} Motor Details:
Direction: ${motorState.direction || 'Not set'}
Angle: ${motorState.angle} degrees
Current Step: ${motorState.step}`);
}

function resetMotor(motorType) {
   // console.log(Reset called for ${motorType});

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