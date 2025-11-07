import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BackButton } from '../../../components/back-button/back-button';
import { ProductosService } from '../../../services/productos';
import { CategoriasService } from '../../../services/categorias';
import { VerProducto } from "../../../components/productos/ver-producto/ver-producto";


@Component({
  selector: 'app-productos',
  imports: [
    Navbar,
    Titlebar,
    BackButton,
    VerProducto
],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})

export class Productos {

}