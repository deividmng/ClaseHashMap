class HashMap {
    // constructor(size = 16) {
    //   this.buckets = Array(size).fill(null).map(() => []); // Crear 'cubos' vacíos
    //   this.size = 0; // Número de elementos en el mapa
    // }
    constructor(size = 16) {
        this.buckets = [];
        for (let i = 0; i < size; i++) {
          this.buckets.push([]); // Añade un array vacío para cada "cubo"
        }
        this.size = 0; // Número de elementos en el mapa
      }
      
    // Función hash sencilla: suma los códigos de los caracteres y usa el módulo para encontrar el índice
    hash(key) {
      let hashCode = 0;
      for (let i = 0; i < key.length; i++) {
        hashCode += key.charCodeAt(i); // Suma los valores ASCII de los caracteres
      }
      return hashCode % this.buckets.length; // Ajusta al tamaño de los cubos
    }
    
  
    // Agregar o actualizar un elemento
    set(key, value) {
      const index = this.hash(key); // Calcula dónde guardar el dato
      const bucket = this.buckets[index]; // Encuentra el cubo correcto
  
      // Revisa si la clave ya existe
      for (let entry of bucket) {
        if (entry.key === key) {
          entry.value = value; // Actualiza el valor
          return;
        }
      }
  
      // Si no existe, agrega un nuevo par clave-valor
      bucket.push({ key, value });
      this.size++; // Incrementa el tamaño
    }
  
    // Obtener un valor por clave
    get(key) {
      const index = this.hash(key); // Calcula el índice
      const bucket = this.buckets[index]; // Encuentra el cubo
  
      // Busca la clave en el cubo
      for (let entry of bucket) {
        if (entry.key === key) {
          return entry.value; // Devuelve el valor si lo encuentra
        }
      }
  
      return null; // Si no lo encuentra, devuelve null
    }
  
    // Eliminar un elemento por clave
    remove(key) {
      const index = this.hash(key); // Calcula el índice
      const bucket = this.buckets[index]; // Encuentra el cubo
  
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i].key === key) {
          bucket.splice(i, 1); // Elimina el elemento
          this.size--; // Reduce el tamaño
          return true; // Confirma la eliminación
        }
      }
  
      return false; // No se encontró la clave
    }
  
    // Verificar si existe una clave
    has(key) {
      return this.get(key) !== null; // Usa get() para verificar
    }
  
    // Limpiar el mapa
    clear() {
      this.buckets = Array(this.buckets.length).fill(null).map(() => []); // Resetea los cubos
      this.size = 0; // Reinicia el tamaño
    }
  
    // Obtener todas las claves
    keys() {
      const keys = [];
      for (let bucket of this.buckets) {
        for (let entry of bucket) {
          keys.push(entry.key); // Agrega cada clave al array
        }
      }
      return keys;
    }
  
    // Obtener todos los valores
    values() {
      const values = [];
      for (let bucket of this.buckets) {
        for (let entry of bucket) {
          values.push(entry.value); // Agrega cada valor al array
        }
      }
      return values;
    }
  
    // Obtener todos los pares clave-valor
    entries() {
      const entries = [];
      for (let bucket of this.buckets) {
        for (let entry of bucket) {
          entries.push([entry.key, entry.value]); // Agrega pares clave-valor al array
        }
      }
      return entries;
    }
  }
  
  // Pruebas básicas
  const test = new HashMap();
  
  // Agregar datos
  test.set('apple', 'red');
  test.set('banana', 'yellow');
  test.set('grape', 'purple');
  
  // Buscar datos
  console.log(test.get('apple')); // 'red'
  console.log(test.get('banana')); // 'red'
  
  // Sobrescribir un valor
  test.set('apple', 'green');
  console.log(test.get('apple')); // 'green'
  
  // Verificar y eliminar
  console.log(test.has('banana')); // true
  test.remove('banana');
  console.log(test.has('banana')); // false
  
  // Obtener claves, valores y pares
  console.log(test.keys()); // ['apple', 'grape']
  console.log(test.values()); // ['green', 'purple']
  console.log(test.entries()); // [['apple', 'green'], ['grape', 'purple']]
  
  // Limpiar el mapa
  test.clear();
  console.log(test.keys()); // []
  