import React from 'react';
import jsPDF from 'jspdf';
import { portfolioData } from '../data/portfolioData';
import { FaDownload, FaFilePdf } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CVGenerator: React.FC = () => {
  const generateCV = () => {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      let yPosition = 20;

      // EN-TÊTE ÉLÉGANT
      pdf.setFontSize(24);
      pdf.setTextColor(0, 0, 0);
      pdf.text(portfolioData.nom.toUpperCase(), 20, yPosition);
      
      yPosition += 8;
      pdf.setFontSize(14);
      pdf.setTextColor(80, 80, 80);
      pdf.text(portfolioData.titre, 20, yPosition);
      
      // Ligne de séparation élégante
      yPosition += 8;
      pdf.setLineWidth(1);
      pdf.setDrawColor(100, 100, 100);
      pdf.line(20, yPosition, pageWidth - 20, yPosition);
      yPosition += 12;

      // LAYOUT EN DEUX COLONNES
      const leftColumn = 20;
      const rightColumn = 110;
      const columnWidth = 80;

      // COLONNE GAUCHE - CONTACT
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      pdf.text('CONTACT', leftColumn, yPosition);
      
      let leftY = yPosition + 6;
      pdf.setFontSize(9);
      pdf.setTextColor(60, 60, 60);
      pdf.text(`📧 ${portfolioData.contact.email}`, leftColumn, leftY);
      leftY += 5;
      pdf.text(`📱 ${portfolioData.contact.telephone}`, leftColumn, leftY);
      leftY += 5;
      pdf.text(`💼 LinkedIn disponible`, leftColumn, leftY);
      leftY += 5;
      pdf.text(`🔗 GitHub disponible`, leftColumn, leftY);

      // COLONNE DROITE - PROFIL
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      pdf.text('PROFIL PROFESSIONNEL', rightColumn, yPosition);
      
      pdf.setFontSize(9);
      pdf.setTextColor(60, 60, 60);
      const profilText = "Développeur Full Stack avec expertise web/mobile. Création d'applications modernes et performantes.";
      const profilLines = pdf.splitTextToSize(profilText, columnWidth);
      pdf.text(profilLines, rightColumn, yPosition + 6);
      
      yPosition += 30;

      // COMPÉTENCES - LAYOUT HORIZONTAL
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      pdf.text('COMPÉTENCES TECHNIQUES', leftColumn, yPosition);
      yPosition += 8;

      // Fond léger pour les compétences
      pdf.setFillColor(250, 250, 250);
      pdf.rect(leftColumn, yPosition - 3, pageWidth - 40, 18, 'F');
      pdf.setDrawColor(220, 220, 220);
      pdf.rect(leftColumn, yPosition - 3, pageWidth - 40, 18);
      
      pdf.setFontSize(9);
      pdf.setTextColor(60, 60, 60);
      pdf.text('Frontend: React, React Native, TypeScript, HTML5, CSS3', leftColumn + 3, yPosition + 2);
      yPosition += 4;
      pdf.text('Backend: Node.js, Express, MongoDB, Firebase, API REST', leftColumn + 3, yPosition + 2);
      yPosition += 4;
      pdf.text('Outils: Git, VS Code, Figma, Jira | Bureautique: Pack Office', leftColumn + 3, yPosition + 2);
      yPosition += 15;

      // EXPÉRIENCE - COMPACT
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      pdf.text('EXPÉRIENCE PROFESSIONNELLE', leftColumn, yPosition);
      yPosition += 8;

      const experiences = [
        {
          periode: "Jan 2025 - Présent",
          poste: "Développeur Full Stack (CDD) - GATS",
          description: "Développement applications web/mobile, projets d'envergure"
        },
        {
          periode: "Août 2024 - Jan 2025",
          poste: "Stagiaire Full Stack - GATS",
          description: "Stage développement, participation projets innovants"
        },
        {
          periode: "Juil-Août 2021",
          poste: "Stagiaire Développeur - TGI",
          description: "Initiation développement web, maintenance informatique"
        }
      ];

      experiences.forEach((exp, index) => {
        // Fond alterné subtil
        if (index % 2 === 0) {
          pdf.setFillColor(248, 248, 248);
          pdf.rect(leftColumn, yPosition - 2, pageWidth - 40, 12, 'F');
        }

        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        pdf.text(`${exp.periode} | ${exp.poste}`, leftColumn + 2, yPosition + 2);
        yPosition += 4;

        pdf.setFontSize(9);
        pdf.setTextColor(80, 80, 80);
        pdf.text(exp.description, leftColumn + 2, yPosition + 2);
        yPosition += 8;
      });

      // FORMATION - COMPACT
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      pdf.text('FORMATION', leftColumn, yPosition);
      yPosition += 8;

      pdf.setFillColor(250, 250, 250);
      pdf.rect(leftColumn, yPosition - 2, pageWidth - 40, 16, 'F');
      pdf.setDrawColor(220, 220, 220);
      pdf.rect(leftColumn, yPosition - 2, pageWidth - 40, 16);

      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      pdf.text('2023-2024 | Licence Informatique - UNIPRO Dakar', leftColumn + 3, yPosition + 3);
      yPosition += 5;
      pdf.setFontSize(9);
      pdf.setTextColor(80, 80, 80);
      pdf.text('Spécialisation développement web/mobile, gestion de projet', leftColumn + 3, yPosition + 3);
      yPosition += 5;
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      pdf.text('2020-2021 | Baccalauréat Scientifique - Congo-Brazzaville', leftColumn + 3, yPosition + 3);
      yPosition += 15;

      // PROJETS - EN DEUX COLONNES
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      pdf.text('PROJETS RÉALISÉS', leftColumn, yPosition);
      yPosition += 8;

      const projets = [
        { nom: "BoomParty", description: "Plateforme réservation événements" },
        { nom: "Mes Délices", description: "App mobile recettes culinaires" },
        { nom: "FixSen", description: "Services de proximité" },
        { nom: "Elegance", description: "E-commerce vêtements" }
      ];

      // Fond pour les projets
      pdf.setFillColor(250, 250, 250);
      pdf.rect(leftColumn, yPosition - 2, pageWidth - 40, 20, 'F');
      pdf.setDrawColor(220, 220, 220);
      pdf.rect(leftColumn, yPosition - 2, pageWidth - 40, 20);

      // Projets en deux colonnes
      projets.forEach((projet, index) => {
        const col = index % 2 === 0 ? leftColumn + 3 : rightColumn;
        const row = Math.floor(index / 2);
        
        pdf.setFontSize(9);
        pdf.setTextColor(0, 0, 0);
        pdf.text(`• ${projet.nom}`, col, yPosition + 3 + (row * 8));
        
        pdf.setFontSize(8);
        pdf.setTextColor(80, 80, 80);
        pdf.text(projet.description, col + 2, yPosition + 6 + (row * 8));
      });

      yPosition += 25;

      // CENTRES D'INTÉRÊT - UNE LIGNE
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      pdf.text('CENTRES D\'INTÉRÊT', leftColumn, yPosition);
      yPosition += 6;

      pdf.setFillColor(250, 250, 250);
      pdf.rect(leftColumn, yPosition - 2, pageWidth - 40, 8, 'F');
      pdf.setDrawColor(220, 220, 220);
      pdf.rect(leftColumn, yPosition - 2, pageWidth - 40, 8);
      
      pdf.setFontSize(9);
      pdf.setTextColor(60, 60, 60);
      pdf.text('🏈 Sport (Football, Basketball) • 💻 Veille technologique • 📚 Formation continue', leftColumn + 3, yPosition + 2);

      // Télécharger le PDF
      console.log('Génération du PDF...');
      pdf.save(`CV_${portfolioData.nom.replace(' ', '_')}.pdf`);
      console.log('PDF généré avec succès');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert(`Erreur lors de la génération du CV: ${error}`);
    }
  };

  return (
    <motion.button
      onClick={generateCV}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <FaFilePdf className="text-xl group-hover:animate-bounce" />
      <span>Télécharger mon CV</span>
      <FaDownload className="text-sm" />
    </motion.button>
  );
};

export default CVGenerator;