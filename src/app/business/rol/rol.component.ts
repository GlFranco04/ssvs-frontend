import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Permiso } from '../../core/models/permiso';
import { PermisoService } from '../../core/services/permiso.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para usar ngModel
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Rol } from '../../core/models/rol';
import { RolService } from '../../core/services/rol.service';

@Component({
  selector: 'app-permiso',
  standalone: true,
  imports: [TableModule, CommonModule, ToastModule, FormsModule, ButtonModule, RippleModule, InputGroupAddonModule, InputGroupModule],
  providers: [MessageService],
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export default class RolComponent {
  roles: Rol[] = [];
  editedRoles: { [key: number]: Rol } = {}; // Para almacenar permisos en edición
  newRol: Rol = { nombre: ''}; // Modelo para el nuevo permiso

  // Añade las propiedades de ordenamiento
  sortField: string = 'id';
  sortOrder: number = 1;

  constructor(
    private rolService: RolService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this.rolService.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  onRowEditInit(rol: Rol) {
    this.editedRoles[rol.id!] = { ...rol };
    this.messageService.add({ severity: 'info', summary: 'Edición', detail: 'Editando rol' });
  }

  onRowEditSave(rol: Rol) {
    if (rol.nombre) {
      this.rolService.updateRol(rol).subscribe(() => {
        delete this.editedRoles[rol.id!];
        this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'Permiso actualizado' });
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Nombre es obligatorio' });
    }
  }

  onRowEditCancel(rol: Rol, rowIndex: number) {
    this.roles[rowIndex] = this.editedRoles[rol.id!] || rol;
    delete this.editedRoles[rol.id!];
    this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Edición cancelada' });
  }

  deleteRol(id: number) {
    this.rolService.deleteRol(id).subscribe(() => {
      this.roles = this.roles.filter(rol => rol.id !== id);
      this.messageService.add({
        severity: 'success',
        summary: 'Eliminado',
        detail: 'Rol eliminado correctamente'
      });
    });
  }

  saveRol() {
    if (this.newRol.nombre) {
      this.rolService.createRol(this.newRol).subscribe((rol) => {
        this.roles.push(rol);
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Nuevo rol creado correctamente'
        });
        this.newRol = { nombre: ''}; // Resetea el formulario
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Nombre es obligatorio'
      });
    }
  }
}
