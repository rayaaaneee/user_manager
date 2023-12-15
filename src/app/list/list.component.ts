import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FormsModule } from '@angular/forms';

import { User } from '../models/user.model';

import { UserService } from '../shared/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class ListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'email', 'occupation', 'actions'];
  dataSource = new MatTableDataSource<User, MatPaginator>([]);

  search: string = '';

  loaded: boolean = false;

  event = new KeyboardEvent('keyup', { key: '' });

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _userService:UserService) {
  }

  ngOnInit(): void {

    this._userService.loadAll();

    this._userService.users$.subscribe((users: User[]) => {
      if (users.length > 0) {
        this.loaded = true;
        this.dataSource.data = users;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.search = filterValue.toLowerCase();
    this.dataSource.filter = this.search;
  }

  resetFilter(input: HTMLInputElement) {
    const event = new KeyboardEvent('keyup', { key: '' });
    input.value = '';
    input.dispatchEvent(event);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
