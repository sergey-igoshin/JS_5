/*
1. Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-теги по своему желанию. Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки. Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H. (использовать createElement / appendChild)
*/

const container = {
  table: document.createElement('table'),
  tableSetting:{      
    margin: 'auto',
    shadow: '2px 2px 20px 1px',
  },    
  letter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  number: ['1', '2', '3', '4', '5', '6', '7', '8'], 
  border:{
    color: 'grey',
    width: '20',
    height: '20',
  },
  cell:{
    color: {
      black: 'black',
      white: 'white',
    },
    width: '50',
    height: '50',      
  },
  font:{
    size: '16',
    color: 'white',
    center: 'center',
    transform: 'rotate3d(0, 0, 1, 180deg)',
  },
};

const main = { 
  container,
  init(){
    this.initTableStyle();
    this.initField();        
    document.querySelector('div').appendChild(this.container.table);
  },

  initTableStyle(){
    this.container.table.style.margin = this.container.tableSetting.margin;
    this.container.table.style.boxShadow = this.container.tableSetting.shadow;
  },

  initField(){
    for (let row = 0; row < 10; row++) {
      const tr = document.createElement('tr');
      this.container.table.appendChild(tr);
      for (let col = 0; col < 10; col++) {
        const td = document.createElement('td');
        row == 0 || row == 9 || col == 0 || col == 9 
          ? this.initBorder(td, row, col)
          : this.initCell(td, row, col);        
        tr.appendChild(td);
      };
    };
  },

  initBorder(td, row, col){
    td.style.backgroundColor = this.container.border.color;

    col == 0 || col == 9 
      ? td.style.width = this.container.border.width + 'px'
      : td.style.height = this.container.border.height + 'px';

    if ((row == 0 && 0 < col && col < 9) || (row == 9 && 0 <   col && col < 9)) td.innerText = this.container.letter[col-1];
    else if(row != 0 && row != 9 && (col == 0 || col == 9)) td.innerText = this.container.number[row-1];     

    this.initFont(td, row);
  },

  initFont(td, row){
    td.style.fontsize = this.container.font.size + 'px';
    td.style.color = this.container.font.color;
    td.style.textAlign = this.container.font.center;
    if(row == 0) td.style.transform = this.container.font.transform;    
  },

  initCell(td, row, col){
    td.style.width = this.container.cell.width + 'px';
    td.style.height = this.container.cell.height + 'px';
    (row % 2 == 0 && col %2 != 0) || (row % 2 != 0 && col % 2 == 0) 
      ? td.style.backgroundColor = this.container.cell.color.black 
      : td.style.backgroundColor = this.container.cell.color.white;    
  },  
}

main.init();
