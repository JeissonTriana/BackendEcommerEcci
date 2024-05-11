# TEST_SERVER

Rutas activas del proyecto:
|Ruta | Método | observaciones |
| --- | --- | ---|
|'/'| cualquiera| Responde con texto un saludo|
|'/getProducts'|GET| Responde con un archivo JSON con la lista de productos|
|'/searchProduct'|GET|Requiere un ID o nombre (enviado por los __querys/params__)y devuelve el producto buscado si existe|
|'/createUser'|POST| Requiere nombre, email y password (enviados por el __body__ de la paetición en formato JSON) y devuelve el estado de la creación del usuario|
