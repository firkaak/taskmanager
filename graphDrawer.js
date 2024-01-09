
import { totalTasks } from './main.js';

let myChart;

const updateChart = (totalTasks, done) => {
  if(!myChart){
  const ctx = document.getElementById('myChart');

  myChart= new Chart(ctx, {
   type: 'pie',
   data: {
     labels: [`done tasks: ${done}, due tasks: ${totalTasks - done}`],
     datasets: [{
       label: '# of Votes',
       data: [done, (totalTasks-done)],
       backgroundColor: [
         '#006850',
         '#880000',
       ],
       borderWidth: 1
     }]
   },
   options: {
     scales: {
       y: {
         beginAtZero: true
       }
     }
   }
  });
} else {
        myChart.data.datasets[0].data = [done, (totalTasks - done)];
        myChart.data.labels = [`done tasks: ${done}`, `due tasks: ${totalTasks - done}`];
        myChart.update();
}

};

export { updateChart };
  
