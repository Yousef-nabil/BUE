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

const selectedDirections = {};
    function setDirection(motorType, direction) {
        selectedDirections[motorType] = direction;
    }

function getSelectedDirection(motorType) {
   /* const directionInputs = document.querySelectorAll(`input[name="${motorType}-direction"]`);
    for (let input of directionInputs) {
        if (input.checked) {
            return input.value;
        }
    }
    return null;
*/


    return selectedDirections[motorType] || null;

}



async function initializeSteps() {
    try {
        const stepData = await fetchCurrentStep();
        
        // Ensure data is in the expected format
        const nema17Steps = stepData[0]?.motor_one_steps || 0;
        const nema23Steps = stepData[0]?.motor_two_steps || 0;

        document.getElementById("nema17-step").textContent = nema17Steps;
        document.getElementById("nema23-step").textContent = nema23Steps;

        console.log(`Initialized steps: NEMA17 = ${nema17Steps}, NEMA23 = ${nema23Steps}`);
    } catch (error) {
        console.error('Failed to initialize steps:', error);
    }
}
document.addEventListener('DOMContentLoaded', initializeSteps);

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
       // Ensure data is in the expected format
       const nema17Steps = stepData[0]?.motor_one_steps || 0;
       const nema23Steps = stepData[0]?.motor_two_steps || 0;

       document.getElementById("nema17-step").textContent = nema17Steps;
       document.getElementById("nema23-step").textContent = nema23Steps;


        // Display details
        alert(`${motorType.toUpperCase()} Motor Details:
Direction: ${direction}
Angle: ${angle} degrees
Current Stepp: ${JSON.stringify(stepData)|| 0}
API Response: ${JSON.stringify(apiResponse, null, 2)}`);
    } catch (error) {
        alert(error);
    }
}



    function setDirection(motorType, direction) {
        selectedDirections[motorType] = direction;

        // Optional: Highlight the active button
        document.querySelectorAll(`.direction-select button`).forEach(btn => {
            btn.classList.remove("active");
        });
        event.target.classList.add("active");
    }

    function getSelectedDirection(motorType) {
        return selectedDirections[motorType] || null;
    }

document.addEventListener("DOMContentLoaded", function () {
    const controls = document.querySelectorAll(".motor-control");
    
    controls.forEach(control => {
        const clockwiseBtn = control.querySelector(".dir[onclick*='clockwise']");
        const anticlockwiseBtn = control.querySelector(".dir[onclick*='anticlockwise']");
        
        if (clockwiseBtn && anticlockwiseBtn) {
            [clockwiseBtn, anticlockwiseBtn].forEach(button => {
                button.addEventListener("click", function () {
                    // Remove selected class from both buttons
                    clockwiseBtn.classList.remove("selected");
                    anticlockwiseBtn.classList.remove("selected");
                    
                    // Toggle selection for the clicked button
                    this.classList.add("selected");
                });
            });
        }
    });
  
    // Add CSS styles for selected buttons
    const style = document.createElement("style");
    style.innerHTML = `
        .selected {
            background-color: #4CAF50; /* Green */
            color: white;
            border: 2px solid #2E7D32;
        }
    `;
    document.head.appendChild(style);
  });