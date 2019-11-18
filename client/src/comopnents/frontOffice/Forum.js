import React, { Component, Fragment } from 'react';
import { Col } from 'antd';
import energie from '../img/alger.png';
import jeunesse from '../img/valette.png';
import economie from '../img/rabat.png';
import culture from '../img/montpellier.png';
import environnement from '../img/palerme.png';
import assembly from '../img/logo.png';
import NavBar from './NavBar';
import './forum.css';
export default class Forum extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <main className="forums">
          <Col span={4} />
          <Col span={16}>
            <p className="forums-intro">
              Cinq forums préparatoires ont eu lieu en amont du Sommet de
              Marseille autour de cinq thématiques : les énergies ; la jeunesse,
              l’éducation, la mobilité ; l’économie et la compétitivité ; la
              culture, les médias, le tourisme ; l’environnement et le
              développement durable. Lors de chacun de ces forums, c’est la
              société civile de la Méditerranée occidentale qui a débattu et
              proposé des projets et initiatives.
            </p>
            <section className="forum energy">
              <div className="forum-header">
                <h2>FORUM ÉNERGIES DE LA MÉDITERRANÉE</h2>
                <h3>
                  Vers un partenariat renforcé au service d'une transition
                  énergétique durable.
                </h3>
              </div>
              <div className="forum-content">
                <div className="forum-logo">
                  <img src={energie} alt="FORUM ÉNERGIES DE LA MÉDITERRANÉE" />
                </div>
                <p>
                  Le Forum d’Alger sur les Energies, à dessein au pluriel,
                  cherche à répondre aux grandes problématiques d’intégration et
                  de coopération régionale que soulève en Méditerranée le défi
                  de la transition énergétique. Les thématiques des énergies
                  renouvelables, de l’efficacité énergétique, du rôle du gaz
                  naturel, mais aussi de l’innovation technologique, avec les
                  nouvelles chaines de valeurs de type « blockchain », la
                  numérisation du secteur de l’énergie ou encore le
                  développement des interconnections électriques, sont ainsi
                  abordées par les participants du Forum d’Alger. Un accent
                  particulier mis sur le retour d’expérience et le partage de
                  bonnes pratiques, dans l’idée de donner aux expériences
                  réussies, même de niveau national, une portée régionale. Avec
                  l’ambition d’orienter cette transition vers des modèles à
                  faible empreinte carbone, ce forum formule des recommandations
                  pour un partenariat énergétique durable en Méditerranée
                  occidentale, incluant les paramètres du développement
                  économique de la zone notamment avec la création de valeurs et
                  d’emplois portée par ces industries.
                </p>
              </div>
            </section>
            <section className="forum youth">
              <div className="forum-header">
                <h2>
                  FORUM JEUNESSE, ÉDUCATION ET MOBILITÉ DE LA MÉDITERRANÉE
                </h2>
                <h3>Investing in a #MediterraneanGeneration.</h3>
              </div>
              <div className="forum-content">
                <div className="forum-logo">
                  <img
                    src={jeunesse}
                    alt="FORUM JEUNESSE, ÉDUCATION ET MOBILITÉ DE LA MÉDITERRANÉE"
                  />
                </div>
                <p>
                  Centré sur la problématique, cruciale pour l’intégration de la
                  région, de l’employabilité des jeunes méditerranéens, le forum
                  de La Valette tentera de faire émerger des solutions concrètes
                  en explorant cinq pistes de travail : multiplicité des liens
                  entre éducation, mobilité et employabilité ; élargissement de
                  l’accès aux programmes de mobilité par les échanges virtuels ;
                  émergence d’une école pluriculturelle ouverte sur le monde ;
                  rôle de la jeunesse dans la construction de la ville
                  intelligente de demain ; interrogations sur le rôle des médias
                  et des réseaux sociaux dans la diffusion du discours (voire
                  des clichés) auprès de la jeunesse. Les discussions seront
                  essentiellement fondées sur les retours sur expérience des
                  programmes existants, dont certains sont des projets
                  labellisés par l’Union pour la Méditerranée (UpM). Une soirée
                  dédiée aux échanges informels entre participants est prévue le
                  24 avril.
                </p>
              </div>
            </section>
            <section className="forum economy">
              <div className="forum-header">
                <h2>FORUM ÉCONOMIE ET COMPÉTIVITÉ DE LA MÉDITERRANÉE</h2>
                <h3>
                  Une meilleure intégration économique entre les deux rives,
                  vers un espace partenarial de croissance et d’innovation
                  partagées.
                </h3>
              </div>
              <div className="forum-content">
                <div className="forum-logo">
                  <img
                    src={economie}
                    alt="FORUM ÉCONOMIE ET COMPÉTIVITÉ
              DE LA MÉDITERRANÉE"
                  />
                </div>
                <p>
                  Le Forum Economie et Compétitivité de Rabat, porté par le
                  Conseil Economique, Social et Environnemental du Maroc, vise à
                  proposer des initiatives concrètes qui répondent aux enjeux
                  économiques, de compétitivité et d’innovation de la région
                  méditerranéenne. Le forum se concentrera autour des
                  sous-thématiques suivantes : entrepreneuriat et compétitivité,
                  économie numérique, économie territoriale, économie sociale et
                  solidaire (ESS). Les propositions émaneront des discussions
                  entre les participants : elles ont pour objectif la mise en
                  valeur de la complémentarité des économies des rives nord et
                  sud, l’appui aux nouveaux modèles économiques (ESS,
                  entrepreneuriat, startups et incubateurs, Tech…), le
                  développement de la croissance et de l’innovation économiques
                  et financières au prisme de l’inclusion sociétale.
                </p>
              </div>
            </section>
            <section className="forum culture">
              <div className="forum-header">
                <h2>FORUM CULTURE, MÉDIAS ET TOURISME DE LA MÉDITERRANÉE</h2>
                <h3>
                  Impulser une nouvelle dynamique culturelle en Méditerranée
                  occidentale.
                </h3>
              </div>
              <div className="forum-content">
                <div className="forum-logo">
                  <img
                    src={culture}
                    alt="FORUM CULTURE, MÉDIAS ET
              TOURISME DE LA MÉDITERRANÉE"
                  />
                </div>
                <p>
                  Exercice résolument nouveau dédié au dialogue entre les deux
                  rives de la Méditerranée, le Forum de Montpellier laissera à
                  celles-ci toute liberté dans la définition de leur agenda
                  prioritaire pour la Méditerranée de demain autour des trois
                  thèmes cruciaux pour le développement et l’épanouissement
                  durable de la région que sont la culture, les médias et le
                  tourisme. Les thèmes de débat naitront de la première
                  discussion générale. Plus de 250 participants issus d’Algérie,
                  d’Espagne, de France, d’Italie, de Libye, de Malte, du Maroc,
                  de la Mauritanie, du Portugal et de la Tunisie seront appelés
                  à partager à Montpellier leurs initiatives pour réaliser cet
                  agenda positif en Méditerranée. Le forum culture sera
                  l’occasion de faire émerger des projets innovants, inclusifs
                  et ambitieux en préparation du Sommet des deux rives de
                  Marseille.
                </p>
              </div>
            </section>
            <section className="forum environment">
              <div className="forum-header">
                <h2>
                  FORUM ENVIRONNEMENT ET DÉVELOPPEMENT DURABLE DE LA
                  MÉDITERRANÉE
                </h2>
                <h3>
                  Économie Bleue, Économie Verte, Économie Circulaire :
                  propositions de partenariat pour un développement urbain
                  côtier durable en Méditerranée occidentale.
                </h3>
              </div>
              <div className="forum-content">
                <div className="forum-logo">
                  <img
                    src={environnement}
                    alt="FORUM ENVIRONNEMENT
              ET DÉVELOPPEMENT DURABLE
              DE LA MÉDITERRANÉE"
                  />
                </div>
                <p>
                  L’Italie, qui a lancé il y a 8 ans un appel à une coopération
                  internationale plus structurée pour faire émerger des
                  solutions concrètes dans les domaines de l’économie bleue et
                  verte avec la tenue du Blue Sea Land Festival à Mazara del
                  Vallo (Sicile), a décidé de s’associer à l’observatoire des
                  pêches de la Méditerranée et à la deuxième Conférence mondiale
                  de la FAO et du CIHEAM sur la revitalisation du régime
                  alimentaire méditerranéen pour l’organisation de ce forum qui
                  tentera d’apporter des solutions environnementales durables
                  pour les écosystèmes côtiers en Méditerranée, allant des
                  méthodes agricoles locales autosuffisantes à des initiatives
                  novatrices de collecte du plastique avec les partenaires de la
                  rive Sud. Deux sessions parallèles dédiées le 16 mai,
                  précédées d’une session inaugurale le 15 mai, seront ainsi
                  directement intégrées au programme de la conférence pour
                  permettre aux participants de travailler sur des propositions
                  d’initiatives qui alimenteront les débats de l’Assemblée des
                  Cent à Tunis, les 11 et 12 juin, en préparation du Sommet de
                  Marseille. L'initiative OuestMED de la Commission européenne
                  organisera également à Palerme le 14 mai des ateliers sur le
                  thème de l’économie bleue, en synergie avec le forum.
                </p>
              </div>
            </section>
            <section className="forum assembly">
              <div className="forum-header">
                <h2>ASSEMBLEE DES CENT, FORUM DE TUNIS</h2>
                <h3>
                  Vers un espace commun de dialogues interculturels, de
                  production et de développement durable, inclusif et solidaire
                </h3>
              </div>
              <div className="forum-content">
                <div className="forum-logo">
                  <img
                    src={assembly}
                    alt="ASSEMBLEE DES CENT, FORUM DE TUNIS "
                  />
                </div>
                <p>
                  En prélude à la tenue du Sommet des Deux Rives, prévu le 24
                  juin 2019 à Marseille, la Tunisie accueillera les 11 et 12
                  juin 2019, l'Assemblée des Cent, Forum de Tunis, qui servira
                  de réceptacle aux idées, projets et initiatives des
                  représentants qualifiés de la société civile des pays du
                  bassin occidental de la Méditerranée, correspondant dans son
                  expression politique à l'espace du Dialogue 5+5 composé de ses
                  dix pays membres. L'Assemblée des Cent va donc s'employer à
                  synthétiser les travaux des cinq forums préparatoires du
                  Sommet et à présélectionner les projets et initiatives qui
                  seront présentés aux Chefs d'État et de Gouvernement. Ceux-ci
                  s'attacheront à mettre en avant, non pas uniquement les
                  projets de coopération du Nord à destination du Sud mais aussi
                  les initiatives développées par la rive Sud, que les acteurs
                  du Nord auraient tout intérêt de prendre en considération,
                  pour éventuellement s'en inspirer. Dans cette perspective, le
                  processus de sélection devra s'opérer, comme convenu, compte
                  tenu des critères contenus dans l'acronyme RIVES, en se basant
                  sur : l'aspect régional des projets en impliquant au moins un
                  pays de la rive nord et un pays de la rive sud de la
                  Méditerranée ; l'impératif d'inclusion à travers la mise en
                  œuvre du projet dans un esprit de partenariat entre tous les
                  acteurs intervenant (institutionnels, société civile,
                  bailleurs de fonds, universités...) ; la réponse à la
                  condition de viabilité du projet afin qu'il soit réalisable ;
                  l'aspect efficace : l'initiative proposée doit être efficace
                  et concrète ; le caractère soutenable et durable du projet qui
                  doit reposer sur la mise en place d’un ou plusieurs objectifs
                  du développement durable (ODD).
                </p>
              </div>
            </section>
          </Col>
          <Col span={4} />
        </main>
      </Fragment>
    );
  }
}
