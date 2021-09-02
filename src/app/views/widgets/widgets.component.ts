import { Component, Inject, OnInit, ViewChild,ElementRef, TemplateRef } from '@angular/core';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { AidaService } from '../../services/aida.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  styleUrls: ['widgets.component.css'],
  templateUrl: 'widgets.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class WidgetsComponent {

  @ViewChild('templateReportHint') templateReportHint:TemplateRef<any>;
  modalReportHint: BsModalRef;

  exercises = [];
  texts = [];
  item: any;

  dataSource = [];
  columnsToDisplay = ['exercise'];
  expandedElement: Exercise;

  config = {
    animated: true
  };

  constructor(private aidaService: AidaService, private modalService: BsModalService) {}
 
  ngOnInit() {  
    this.loadExercises()
  } 

  async loadExercises() {

    let results = await this.aidaService.getExercises()
    .then(responses => responses.map( response => {
      return {
        'exercise': response['value']['text'].slice(0,100) + ' ...',
        'text': response['value']['text'],
        'block': response['value']['block'],
        'gaps': response['value']['gaps'],
        'show': response['value']['gaps'].filter((gap) => gap.enable).length > 0
      }
    }));

    this.texts = results.filter( (el) => {
      return el['text'] != "";
    });

    /* console.log(this.texts) */

  }


  reportHint(value){
    this.item = value;
    this.modalReportHint = this.modalService.show(this.templateReportHint, this.config);
  }

}

export interface Exercise {
  exercise: string;
  text: string;
  conversion: string;
}

/*  // lineChart1
 public lineChart1Data: Array<any> = [
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Series A'
  }
];
public lineChart1Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
public lineChart1Options: any = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      gridLines: {
        color: 'transparent',
        zeroLineColor: 'transparent'
      },
      ticks: {
        fontSize: 2,
        fontColor: 'transparent',
      }

    }],
    yAxes: [{
      display: false,
      ticks: {
        display: false,
        min: 40 - 5,
        max: 84 + 5,
      }
    }],
  },
  elements: {
    line: {
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
  legend: {
    display: false
  }
};
public lineChart1Colours: Array<any> = [
  { // grey
    backgroundColor: getStyle('--primary'),
    borderColor: 'rgba(255,255,255,.55)'
  }
];
public lineChart1Legend = false;
public lineChart1Type = 'line';

// lineChart2
public lineChart2Data: Array<any> = [
  {
    data: [1, 18, 9, 17, 34, 22, 11],
    label: 'Series A'
  }
];
public lineChart2Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
public lineChart2Options: any = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      gridLines: {
        color: 'transparent',
        zeroLineColor: 'transparent'
      },
      ticks: {
        fontSize: 2,
        fontColor: 'transparent',
      }

    }],
    yAxes: [{
      display: false,
      ticks: {
        display: false,
        min: 1 - 5,
        max: 34 + 5,
      }
    }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
  legend: {
    display: false
  }
};
public lineChart2Colours: Array<any> = [
  { // grey
    backgroundColor: getStyle('--info'),
    borderColor: 'rgba(255,255,255,.55)'
  }
];
public lineChart2Legend = false;
public lineChart2Type = 'line';


// lineChart3
public lineChart3Data: Array<any> = [
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: 'Series A'
  }
];
public lineChart3Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
public lineChart3Options: any = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: false
    }],
    yAxes: [{
      display: false
    }]
  },
  elements: {
    line: {
      borderWidth: 2
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
  legend: {
    display: false
  }
};
public lineChart3Colours: Array<any> = [
  {
    backgroundColor: 'rgba(255,255,255,.2)',
    borderColor: 'rgba(255,255,255,.55)',
  }
];
public lineChart3Legend = false;
public lineChart3Type = 'line';


// barChart1
public barChart1Data: Array<any> = [
  {
    data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
    label: 'Series A',
    barPercentage: 0.6
  }
];
public barChart1Labels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
public barChart1Options: any = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: false,
    }],
    yAxes: [{
      display: false
    }]
  },
  legend: {
    display: false
  }
};
public barChart1Colours: Array<any> = [
  {
    backgroundColor: 'rgba(255,255,255,.3)',
    borderWidth: 0
  }
];
public barChart1Legend = false;
public barChart1Type = 'bar';

// lineChart4
public lineChart4Data: Array<any> = [
  {
    data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
    label: 'Series A'
  }
];
public lineChart4Labels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
public lineChart4Options: any = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: false,
      points: false,
    }],
    yAxes: [{
      display: false,
    }]
  },
  elements: { point: { radius: 0 } },
  legend: {
    display: false
  }
};
public lineChart4Colours: Array<any> = [
  {
    backgroundColor: 'transparent',
    borderColor: 'rgba(255,255,255,.55)',
    borderWidth: 2
  }
];
public lineChart4Legend = false;
public lineChart4Type = 'line';


// barChart2
public barChart2Data: Array<any> = [
  {
    data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
    label: 'Series A',
    barPercentage: 0.6
  }
];
public barChart2Labels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
public barChart2Options: any = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: false,
    }],
    yAxes: [{
      display: false,
      ticks: {
        beginAtZero: true,
      }
    }]
  },
  legend: {
    display: false
  }
};
public barChart2Colours: Array<any> = [
  {
    backgroundColor: 'rgba(0,0,0,.2)',
    borderWidth: 0
  }
];
public barChart2Legend = false;
public barChart2Type = 'bar';


// barChart3
public barChart3Data: Array<any> = [
  {
    data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
    label: 'Series A'
  }
];
public barChart3Labels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
public barChart3Options: any = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: false
    }],
    yAxes: [{
      display: false
    }]
  },
  legend: {
    display: false
  }
};
public barChart3Primary: Array<any> = [
  {
    backgroundColor: getStyle('--primary'),
    borderColor: 'transparent',
    borderWidth: 1
  }
];
public barChart3Danger: Array<any> = [
  {
    backgroundColor: getStyle('--danger'),
    borderColor: 'transparent',
    borderWidth: 1
  }
];
public barChart3Success: Array<any> = [
  {
    backgroundColor: getStyle('--success'),
    borderColor: 'transparent',
    borderWidth: 1
  }
];
public barChart3Legend = false;
public barChart3Type = 'bar';


// lineChart5
public lineChart5Data: Array<any> = [
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Series A'
  }
];
public lineChart5Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
public lineChart5Options: any = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: false,
      points: false,
    }],
    yAxes: [{
      display: false,
    }]
  },
  elements: { point: { radius: 0 } },
  legend: {
    display: false
  }
};
public lineChart5Info: Array<any> = [
  {
    backgroundColor: 'transparent',
    borderColor: getStyle('--info'),
    borderWidth: 2
  }
];
public lineChart5Success: Array<any> = [
  {
    backgroundColor: 'transparent',
    borderColor: getStyle('--info'),
    borderWidth: 2
  }
];
public lineChart5Warning: Array<any> = [
  {
    backgroundColor: 'transparent',
    borderColor: getStyle('--warning'),
    borderWidth: 2
  }
];
public lineChart5Legend = false;
public lineChart5Type = 'line'; */
