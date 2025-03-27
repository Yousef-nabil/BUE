// Debug log to verify script is loading
console.log("External script loaded successfully!");

// Motor state tracking
const motorStates = {
    nema17: {
        direction: null,
        angle: 0,
        steps: 0
    },
    nema23: {
        direction: null,
        angle: 0,
        steps: 0
    }
};

function rotateMotor(motorType, direction) {
    console.log(`Rotate function called for ${motorType} in ${direction} direction`);

    // Get references to input and output elements
    const angleInput = document.getElementById(`${motorType}-angle`);
    const stepsInput = document.getElementById(`${motorType}-steps`);

    // Parse angle and steps inputs or default to 0
    const angle = angleInput.value ? parseInt(angleInput.value) : 0;
    const steps = stepsInput.value ? parseInt(stepsInput.value) : 0;

    // Update motor state
    const motorState = motorStates[motorType];
    motorState.direction = direction;
    motorState.angle = angle;
    motorState.steps = steps;

    // Optional: Additional logging
    console.log(`${motorType.toUpperCase()} state:`, motorState);
}

function pressAction(motorType) {
    console.log(`Press action called for ${motorType}`);

    const motorState = motorStates[motorType];

    // Display motor state details
    alert(`${motorType.toUpperCase()} Motor Details:
Direction: ${motorState.direction || 'Not set'}
Angle: ${motorState.angle} degrees
Steps: ${motorState.steps}`);
}

// Optional: Log when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
});