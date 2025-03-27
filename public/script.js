// Global variables to track motor states
let nema17State = {
    direction: null,
    angle: 0,
    step: 0
};

let nema23State = {
    direction: null,
    angle: 0,
    step: 0
};

function rotateMotor(motorType, direction) {
    // Get angle input
    const angleInput = document.getElementById(`${motorType}-angle`);
    const stepOutput = document.getElementById(`${motorType}-step`);
    const angle = angleInput.value ? parseInt(angleInput.value) : 0;

    // Update motor state
    const motorState = motorType === 'nema17' ? nema17State : nema23State;
    motorState.direction = direction;
    motorState.angle = angle;

    // Update step counter
    if (direction === 'clockwise') {
        motorState.step++;
    } else {
        motorState.step--;
    }

    // Update UI
    stepOutput.textContent = motorState.step;

    // Optional: Log motor rotation details
    console.log(`${motorType.toUpperCase()} rotated ${direction} by ${angle} degrees`);
}

function pressAction(motorType) {
    const motorState = motorType === 'nema17' ? nema17State : nema23State;

    // Example press action logic
    alert(`Press action for ${motorType.toUpperCase()}
Direction: ${motorState.direction || 'Not set'}
Angle: ${motorState.angle} degrees
Current Step: ${motorState.step}`);

    // You can add more complex logic here:
    // - Send commands to motor controller
    // - Trigger specific mechanical actions
    // - Log or record motor state
}

// Optional: Reset functionality
function resetMotor(motorType) {
    const angleInput = document.getElementById(`${motorType}-angle`);
    const stepOutput = document.getElementById(`${motorType}-step`);

    if (motorType === 'nema17') {
        nema17State = { direction: null, angle: 0, step: 0 };
    } else {
        nema23State = { direction: null, angle: 0, step: 0 };
    }

    angleInput.value = '';
    stepOutput.textContent = '0';
}