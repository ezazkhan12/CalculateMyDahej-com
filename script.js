document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultContainer = document.getElementById('resultContainer');
    const resultValue = document.getElementById('resultValue');
    const breakdownList = document.getElementById('breakdownList');

    calculateBtn.addEventListener('click', calculateDahej);

    function calculateDahej() {
        // Get input values
        const governmentJobCount = parseInt(document.getElementById('governmentJobCount').value) || 0;
        const landArea = parseFloat(document.getElementById('landArea').value) || 0;
        const monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value) || 0;
        const homePrice = parseFloat(document.getElementById('homePrice').value) || 0;
        const businessValue = parseFloat(document.getElementById('businessValue').value) || 0;

        // Calculate components
        const governmentJobValue = governmentJobCount * 200000;
        const landValue = landArea * 500; // Changed back to 500 per original spec
        const incomeValue = monthlyIncome * 15;
        const homeValue = homePrice * 0.1;
        const businessContribution = businessValue * 0.1; // 10% of business value

        // Calculate total (including hidden business contribution)
        const totalValue = governmentJobValue + landValue + incomeValue + homeValue + businessContribution;

        // Display results (without showing business contribution)
        displayResults(totalValue, {
            "Government Employees": governmentJobValue,
            "Land Ownership": landValue,
            "Monthly Income": incomeValue,
            "Home Value": homeValue
            // Business contribution is intentionally not shown
        });
    }

    function displayResults(total, breakdown) {
        // Format total with Indian rupee symbol and commas
        resultValue.textContent = '₹' + formatNumber(total);
        
        // Clear previous breakdown
        breakdownList.innerHTML = '';
        
        // Add each breakdown item
        for (const [key, value] of Object.entries(breakdown)) {
            if (value > 0) {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${key}:</strong> ₹${formatNumber(value)}`;
                breakdownList.appendChild(li);
            }
        }
        
        // Show the result container
        resultContainer.classList.remove('hidden');
        
        // Scroll to results
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    function formatNumber(num) {
        return num.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        });
    }
});