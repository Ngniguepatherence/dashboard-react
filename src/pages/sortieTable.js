import React from 'react';

const SortiesTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date d'Annonce</th>
          <th>Mois de Décaissement</th>
          <th>Bénéficiaire</th>
          <th>Libellé</th>
          <th>Montant</th>
          <th>Soldé</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortiesTable;