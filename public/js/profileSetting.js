    document.addEventListener("DOMContentLoaded", () => {
        const profileImageInput = document.getElementById("profileImage");
        const previewImage = document.getElementById("previewImage");

        // Listen for file input changes
        profileImageInput.addEventListener("change", (event) => {
            const file = event.target.files[0]; // Get the selected file

            if (file) {
                const reader = new FileReader(); // Create a FileReader instance

                // Load the file and update the preview image
                reader.onload = (e) => {
                    previewImage.src = e.target.result; // Update the image source
                };
                reader.readAsDataURL(file); // Convert the file to a Data URL
            }
        });
    });