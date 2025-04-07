document.addEventListener('DOMContentLoaded', function () {
    const windowSize = 50; 
    let times = [];
    let values = [];

    async function fetchData() {
        try {
            const response = await fetch('http://localhost:3000/ecg-data');
            const data = await response.json(); 
            if (data.length > 0) {
                console.log('Data fetched:', data); 
                updateGraph(data); 
            }
        } catch (error) {
            console.error('Error fetching ECG data:', error);
        }
    }

    function updateGraph(data) {
        data.forEach(d => {
            const time = new Date(d.timestamp * 1000).toLocaleTimeString(); 
            times.push(time);
            values.push(d.value);
        });

        if (times.length > windowSize) {
            times = times.slice(-windowSize); 
            values = values.slice(-windowSize); 
        }        

        Plotly.react('plot', [{
            x: times,
            y: values,
            type: 'scatter',
            mode: 'lines+markers',
            line: {
                color: 'lime',
                width: 2
            }
        }], layout);
        
    }

    setInterval(fetchData, 1000);
});
