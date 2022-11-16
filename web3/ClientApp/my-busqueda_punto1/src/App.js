import {useEffect, useState} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import './App.css';

const endpoint = 'https://localhost:2000';

function App() {

  const [usuarios, setUsuarios] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");


  const peticionGet = async () => {
    await axios.get(`${endpoint}/Cliente/Listar`)
        .then(response => {

          console.log(response.data)
          setUsuarios(response.data);
          setTablaUsuarios(response.data);
        }).catch(error => {
          console.log(error);
        })
  }


  const handleChange = e => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const filtrar=(terminoBusqueda)=>{
    var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{

      if(elemento.productId.toString().includes(terminoBusqueda.toLowerCase())
      ){
        return elemento;
      }
    });
    setUsuarios(resultadosBusqueda);
  }

  useEffect(() => {
    peticionGet();
  }, [])

  return (
      <div className="App">
        <div className={"container"}>

        <div className="containerInput">
          <input
              className="form-control inputBuscar"
              value={busqueda}
              placeholder="Búsqueda por ID producto"
              onChange={handleChange}
          />
          <button className="btn btn-success">
            <FontAwesomeIcon icon={faSearch}/>
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-sm table-bordered">
            <thead>
            <tr>
              <th>ID</th>
              <th>Nombre del Producto</th>
              <th>Referencia</th>
              <th>Categoria</th>
              <th>Descripción</th>
              <th>Marca</th>
            </tr>
            </thead>

            <tbody>
            {usuarios &&
                usuarios.map((usuario) => (
                    <tr key={usuario.productId}>
                      <td>{usuario.productId}</td>
                      <td>{usuario.productName}</td>
                      <td>{usuario.productReference}</td>
                      <td>{usuario.categories[0].toString().replace("/"," ")}</td>
                      <td>{usuario.description}</td>
                      <td>{usuario.brand}</td>
                    </tr>
                ))}
            </tbody>

          </table>

        </div>
        </div>
      </div>
  );
}

export default App;
