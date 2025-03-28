| Recursos básicos propuesto para el TP2 |
| :---- |

[x] **usuarios**  
- GET: Obtener listado de usuarios. Rol: ADMIN  
- POST: Crear un usuario. Rol: ADMIN

[x] **usuario/id**  
- GET: . Obtener un usuario. Rol: ADMIN  
- PUT: Editar un usuario. Rol: ADMIN  
- DELETE: Eliminar un usuario (cambiar de estado o suspender). Rol: ADMIN/ENCARGADO

[x] **productos** (comidas rotisería)  
GET: obtener una lista de productos Rol: USER/ADMIN/ENCARGADO  
POST: crear un producto Rol: ADMIN

[x] **producto/id**  (comidas rotisería)  
GET: Obtener un producto. Rol: USER/ADMIN/ENCARGADO  
PUT: Editar un producto.  Rol: ADMIN/ENCARGADO  
DELETE: Eliminar un producto Rol: ADMIN

**logout:**  
POST: invalida token actual Rol: USER/ADMIN/ENCARGADO

**login:**  
POST: loguear un usuario Rol: USER/ADMIN/ENCARGADO

[x] **pedidos**  
GET: Obtener todos los pedidos Rol: ADMIN/ENCARGADO  
POST: Crear un pedido Rol: USER/ADMIN/ENCARGADO

[x] **pedido/id**  
GET: Obtener un pedido Rol: USER/ADMIN/ENCARGADO  
PUT: Modificar pedido Rol: USER(si cancela)/ADMIN/ENCARGADO  
DELETE: Eliminar pedido Rol: USER(si cancela)/ADMIN/ENCARGADO

[x] **notificaciones**  
POST: Enviar notificación a un usuario Rol:ADMIN/ENCARGADO

[x] **valoración**  
POST: Agregar una valoración a producto Rol: USER  
GET: Obtener valoración de un producto Rol: ADMIN










| Recursos armados en clase por los alumnos |
| :---- |


Pedidos  
Post: agregar pedido.  
Get: información del pedido  
Put: editar pedido  
DELETE: Eliminar el pedido  
ADMIN \- EMPLEADO

Informes  
GET: Obtener reporte de ventas por fecha. Rol Administrador  
GET: Obtener reporte de productos más vendidos. Rol Administrador

Menú  
GET: Obtener listado de productos. Rol Administrador  
POST: Agregar un nuevo producto al menú. Rol Administrador  
PUT: Editar un producto. Rol Administrador  
DELETE: Eliminar un producto. Rol Administrador/Empleado

Pedidos   
GET:Ver detalles del pedido . Rol: Admin/Empleado  
PUT: Actualizar estado del pedido. Rol: Admin/Empleado  
DELETE: Cancelar un pedido/ Eliminar un pedido. Rol: Admin/Empleado

**Clientes**  
GET: Listar clientes registrados. Rol Admin/Encargado  
POST: Registrar un nuevo cliente. Rol TODOS  
GET: Ver información de un cliente. Rol Admin/Encargado y el propio cliente  
– PUT: Modificar datos del cliente. Rol Admin/Encargado  
DELETE: Bloquear/Suspender a un cliente. Rol Admin/Encargado

**Autentificación**  
POST: Iniciar sesión. Rol Todos  
PUT: Cerrar sesión. Rol Todos  
GET: Obtener información del usuario

**Usuario**  
**GET:** Ver el menú actualizado. **Rol: CLIENTE, EMPLEADO, ADMIN**  
**POST:** Realizar un pedido. **Rol: CLIENTE.**  
**PUT:** Cancelar un pedido antes de su confirmación. **ROL: CLIENTE.**  
**POST:** Calificar un pedido. **Rol: CLIENTE.**  
**GET:** Ver historial de pedidos. **Rol: CLIENTE**

### **Calificaciones**

POST: Calificar un producto. Rol: CLIENTE (solo si consumió el producto)  
GET: Obtener calificaciones de un producto. Rol: PÚBLICO