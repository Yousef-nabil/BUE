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