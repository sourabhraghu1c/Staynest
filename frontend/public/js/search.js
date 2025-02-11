
    // Handle selection of price range buttons
    document.querySelectorAll('.price-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            document.querySelectorAll('.price-btn').forEach(function(btn) {
                btn.classList.remove('selected');
            });
            button.classList.add('selected');
        });
    });

    // Handle selection of property type buttons
    document.querySelectorAll('.property-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            document.querySelectorAll('.property-btn').forEach(function(btn) {
                btn.classList.remove('selected');
            });
            button.classList.add('selected');
        });
    });

        document.addEventListener('DOMContentLoaded', function() {
            // Apply Filters Button Click Event
            document.getElementById('applyFiltersButton').addEventListener('click', function() {
                // Get selected price range
                const priceRange = document.querySelector('input[name="price"]:checked');
                // Get selected property type
                const propertyType = document.querySelector('input[name="property"]:checked');

                // Set hidden input values if selections are made
                if (priceRange) {
                    document.getElementById('priceRange').value = priceRange.value;
                }
                if (propertyType) {
                    document.getElementById('propertyType').value = propertyType.value;
                }
            });
        });
