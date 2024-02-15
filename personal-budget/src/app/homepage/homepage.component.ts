import { Component, NgModule,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';

@Component({
  host: {ngSkipHydration: 'true'},
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {

  public dataSource = {
    datasets: [
      {
        data: [] as number[],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
        ]
      }
    ],
    labels: [] as string[]
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('ngOnInit triggered');
    this.http.get('http://localhost:3000/budget')
      .subscribe(
        (res: any) => {
          console.log(res);
          for (let i = 0; i < res.myBudget.length; i++) {
            this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
            this.dataSource.labels[i] = res.myBudget[i].title;
          }
          this.createChart();
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource
    });
  }
}




