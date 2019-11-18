import React, { Component, Fragment } from "react";
import med from "../img/sidi-bou.jpg";
import trigger from "../img/trigger.png";
import stategy from "../img/strategy.png";
import conversation from "../img/conversation.png";
import calender from "../img/calender.png";
import "antd/dist/antd.css";
import "./home.css";
import NavBar from "./NavBar";
import { Row, Col } from "antd";
export default class Home extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <main className="home-page">
          <section className="home-cover">
            <img src={med} alt="med" style={{ width: "100%" }} />
            <h1>
              <span className="sommet">Sommet </span> <br />
              <span className="rive">des deux rives</span>
            </h1>
          </section>
          <section className="home-body">
            <Row type="flex" justify="center">
              <Col lg={{ span: 10 }}>
                <div className="body-box">
                  <h3 className="body-title">
                    UNE INITIATIVE DU PRÉSIDENT DE LA RÉPUBLIQUE FRANÇAISE
                  </h3>
                  <p>
                    Fruit d’une initiative du Président de la République
                    Emmanuel Macron, le Sommet des deux rives, Forum de la
                    Méditerranée, se tiendra à Marseille les 23 et 24 juin
                    prochains. Au terme d’un exercice inédit de consultation de
                    la société civile méditerranéenne, il a pour ambition de
                    relancer la dynamique de coopération en Méditerranée
                    occidentale par la mise en œuvre de projets concrets et
                    initiatives en faveur du développement humain, économique et
                    durable dans la région.
                  </p>
                </div>
              </Col>
              <Col lg={{ span: 10 }}>
                <div className="body-box">
                  <h3 className="body-title">
                    LE PÉRIMÈTRE D'ACTION : LA MÉDITERRANÉE OCCIDENTALE
                  </h3>
                  <p>
                    Le périmètre retenu est celui des dirigeants des pays
                    composant le dialogue 5+5 sur la Méditerranée occidentale
                    (Portugal, Espagne, France, Italie, Malte, Mauritanie,
                    Maroc, Algérie, Tunisie, Libye) auxquels seront également
                    associés l’Union Européenne, l’Allemagne, mais aussi les
                    organisations méditerranéennes (Union pour la Méditerranée,
                    Fondation Anna Lindh), les principales organisations
                    économiques internationales présentes dans la région (la
                    Banque Mondiale, la Banque européenne d’investissement, la
                    Banque européenne pour la reconstruction et le
                    développement, l’Organisation pour la coopération et le
                    développement économiques).
                  </p>
                </div>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col lg={{ span: 10 }}>
                <div className="body-box">
                  <h3 className="body-title">
                    LES CENT PERSONNALITÉS QUALIFIÉES ISSUES DE LA SOCIÉTÉ
                    CIVILE DE LA MÉDITERRANÉE OCCIDENTALE
                  </h3>
                  <p>
                    Chaque État dialogue 5+5 a suggéré dix personnalités issues
                    de la société civile, l’une d’entre elles est désignée chef
                    de file. Les chefs de file sont réunis en un comité de
                    pilotage dont les travaux sont coordonnés par la cheffe de
                    file tunisienne, Ouided Bouchamaoui. Ces personnalités
                    qualifiées sont appelées « les Cent ». Ils participent à
                    l’ensemble des forums préparatoires thématiques dans une
                    optique de restitution des débats et de recensement des
                    idées et des projets. Ils se réuniront les 11 et 12 juin à
                    Tunis pour un exercice de synthèse, appelé « l’Assemblée des
                    Cent ».
                  </p>
                </div>
              </Col>
              <Col lg={{ span: 10 }}>
                <div className="body-box">
                  <h3 className="body-title">
                    LE PARTI-PRIS : UNE MOBILISATION INÉDITE DE LA SOCIÉTÉ
                    CIVILE DE LA MÉDITERRANÉE OCCIDENTALE
                  </h3>
                  <p>
                    Le Sommet des deux rives repose sur la conviction que la
                    société civile doit être pleinement associée à la définition
                    d’un nouvel agenda positif pour la Méditerranée. Le Sommet
                    intègre pleinement la société civile à travers d’une part
                    cinq forums thématiques préparatoires et une réunion de
                    synthèse organisés par des pays du dialogue 5+5. Et d’autre
                    part, la mobilisation de Cent personnalités qualifiées de la
                    société civile méditerranéenne issues des pays du dialogue
                    5+5.
                  </p>
                </div>
              </Col>
            </Row>
          </section>
          <section className="resume">
            <h2>
              SOMMET DES DEUX RIVES, FORUM DE LA
              <br />
              MÉDITERRANÉE EN BREF
            </h2>
            {/* <p className='home-paragraph'>ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
              <br></br>doloremque laudantium, totam rem aperiam, eaque ipsa </p> */}

            <div className="riveEnBref">
              <Row type="flex" justify="center">
                <Col span={6}>
                  <div className="gutter-box">
                    <img src={calender} alt="" />
                    <h3>UN AGENDA POSITIF</h3>
                    <p>
                      Pour réaffirmer la dimension positive et le potentiel de
                      la région et mettre en avantla complémentarité des
                      échanges entre le Sud et le Nord de la Méditerranée.
                    </p>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="gutter-box">
                    <img src={conversation} alt="" />
                    <h3>UNE DYNAMIQUE D’INCLUSION</h3>
                    <p>
                      Pour ouvrir les échanges à tous, et en particulier la
                      jeunesse et ainsi dépasser
                      uneapprocheinstitutionnelleetfragmentée de la coopération
                      dans l’espace méditerranéen.
                    </p>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="gutter-box">
                    <img src={stategy} alt="" />
                    <h3>UNE DEMARCHE PRAGMATIQUE</h3>
                    <p>
                      Afin de produire des résultats tangibles fondés sur des
                      initiatives concrètes et rapidement actionnables.
                    </p>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="gutter-box">
                    <img src={trigger} alt="" />
                    <h3>UNE IMPULSION EN MÉDITÉRRANÉE</h3>
                    <p>
                      Afin de lancer une nouvelle dynamique de coopération
                      centrée sur la participation de la société civile dans le
                      cadre des organisations existantes.
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </section>
        </main>
      </Fragment>
    );
  }
}
