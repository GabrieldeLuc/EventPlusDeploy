import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import { Link, useLocation } from "react-router-dom";
import "./DetalhesEvento.css";

import back from "../../assets/images/setaback.svg";
import api , {commentaryEventResource} from '../../Services/Service'; 
import { UserContext } from "../../context/AuthContext";
import Container from "../../components/Container/Container";
import feedBack from "../../components/FeedBack/feedBack";

const DetalhesEvento = () => {

  const { state } = useLocation();
  const [feedBack, setFeedback] = useState([]);
  const { userData } = useContext(UserContext);
  //const {idEvento} = useState();
  //  const [detalhesEvento, setDetalhesEvento] = useState({});
  // const [comentario, setComentario] = useState([]);

  const [tipo, setTipo] = useState("");
  const [data, setData] = useState("");
  const [descricaoEvento, setDescricaoEvento] = useState("");
  const { idEvento } = useParams();

  useEffect(() => {
    // async function buscarDetalhesEvento() {
    //   try {
    //   const resposta = await api.get(eventsResource + "/" + idEvento);
    // setData(resposta.data);
    //  console.log(resposta);
    //  } catch (error) {
    //  console.log("rfdfsafdfghdfsjklldfsafghjkljfd");
    //  console.log(error);
    //  }
    //  }
    //buscarDetalhesEvento();
    // }, []);

    async function DetalhesEvento() {
      try {
        const promiseFeedBack = await api.get(commentaryEventResource + "/" + idEvento);

        setFeedback(promiseFeedBack.data);
        console.log(promiseFeedBack.data);
        console.log(feedBack);
      } catch (error) {}
    }
    DetalhesEvento();
  }, []);

  //<section>
  //<Title titleText={"Detalhes do Evento"} />

  //<p>Data do Evento : {data.dataEvento}</p>
  //<p>Descrição do Evento : {descricaoEvento.descricao}</p>
  //<p>Tipo</p>
  //</section>

  return (
    <MainContent>
      {userData.role == "Administrador" ? (
        <Link to={"/eventos"}>
          <img src={back} className="back" />
        </Link>
      ) : (
        <Link to={"/eventos-aluno"}></Link>
      )}

      <section className="detalhes-evento">
        <Title titleText={"Detalhes do Evento"} additionalClass="margim-aci" />
        <div className="detalhes">
          <h1> {state.nomeEvento}</h1>

          <p>
            <strong>Data do Evento:</strong> {""}
            {new Date(state.dataEvento).toLocaleDateString()}
          </p>
          <p>
            <strong>Descrição do Evento: </strong> {state.descricao}
          </p>
          <p>
            <strong>Tipo Do Evento:</strong> {state.tiposEvento.titulo}
          </p>
        </div>
      </section>

      <section className="comentarios-evento">
        <Container>
          <section className="comentarios">
            <Title
              titleText={"Comentários do Evento"}
              additionalClass="margem-aci"
              color="white"
            />

            <div className="events-box">
              {feedBack.map((e) => {
                if (e.idEvento == state.idEvento) {
                  if (e.exibir == false && userData.role == "Comum") {
                    return;
                  } else if (
                    e.exibe === false &&
                    userData.role == "Administrador"
                  ) {
                    return (
                      <feedBack
                       
                        feedBack={e.descricao}
                       
                        exibir="Comentário Ofensivo"
                      />
                    );
                  }
                }
              })}
            </div>
          </section>
        </Container>
      </section>
    </MainContent>
  );
};

export default DetalhesEvento;
