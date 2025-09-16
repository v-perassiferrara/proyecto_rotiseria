import { Component } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { Titlebar } from '../../../components/titlebar/titlebar';

@Component({
  selector: 'app-productos',
  imports: [
    Navbar,
    Titlebar],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {

}