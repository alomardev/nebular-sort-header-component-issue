import { Component } from '@angular/core';
import { NbSortDirection, NbSortRequest } from '@nebular/theme';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface Item {
  name: string;
  size: string;
  kind: string;
  items?: number;
}

@Component({
  selector: 'app-root',
  template: `
  <nb-layout>
    <nb-layout-column>
      <table [nbTreeGrid]="data" nbSort (sort)="onSort($event)">

        <tr nbTreeGridHeaderRow *nbTreeGridHeaderRowDef="columns"></tr>
        <tr nbTreeGridRow [clickToToggle]="false" *nbTreeGridRowDef="let row; columns: columns"></tr>

        <ng-container *ngFor="let colId of columns; let index = index" [nbTreeGridColumnDef]="colId">

          <th nbTreeGridHeaderCell *nbTreeGridHeaderCellDef nbSortHeader>
            {{ colId }}
          </th>

          <td nbTreeGridCell *nbTreeGridCellDef="let row">
            {{ row.data[colId] }}
          </td>

        </ng-container>

      </table>
      <pre>{{ requests }}</pre>
    </nb-layout-column>
  </nb-layout>
  `,
  styles: [],
  host: { 
    class: 'nb-theme-default',
  }
})
export class AppComponent {
  columns = ['name', 'size', 'kind', 'items'];

  data: TreeNode<Item>[] = [
    {
      data: { name: 'Projects', size: '1.8 MB', items: 5, kind: 'dir' },
    },
    {
      data: { name: 'Reports', kind: 'dir', size: '400 KB', items: 2 },
    },
    {
      data: { name: 'Other', kind: 'dir', size: '109 MB', items: 2 },
    },
  ];

  requests: string = '';

  onSort(event: NbSortRequest) {
    console.log(event);
    
    this.requests = `${JSON.stringify(event)}\n${this.requests}`;
    
    this.data = [...this.data.sort((nodeA, nodeB) => {
      const a: any = nodeA.data;
      const b: any = nodeB.data;
      if (a[event.column] === b[event.column]) {
        return 0;
      }
      if (a[event.column] < b[event.column]) {
        return event.direction === NbSortDirection.ASCENDING ? -1 : 1;
      }
      if (a[event.column] > b[event.column]) {
        return event.direction === NbSortDirection.ASCENDING ? 1 : -1;
      }
      return 0;
    })];
  }
}
