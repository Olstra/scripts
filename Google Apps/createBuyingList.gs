/*

Author: Olstra
Date: Aug 2019

What is this?
-> a script that writes all cells of a certain color into another sheet

What for?
-> automatically creates a buying list

How to use:
- Lager: put everything you need here
- color cell "A1" a certain color
- when something is missing, color that cell the same color as A1
- run this script before you go shopping to create a buying list

*/


function getColCells() {
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // we will save all entries into the first sheet
  var einkaufsListe = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
 
  var color = sheet.getRange("A1").getBackground();
  //Logger.log(color);

  // just pick manually for simplicity = max items in "lager"
  var max = 20;
  
  var listItems = []; // = only 1 ROW!
  var currentCel;
  //var count = 0;
  
  // loop through "lager" cells
  for( var rowNr = 0; rowNr < max; rowNr++ ){
    for( var colNr = 0; colNr < max; colNr++ ){
      
      currentCel = sheet.getRange( rowNr+1, colNr+1 );
      
      if( currentCel.getBackground() == color ){
        //count = count + 1; 
        listItems.push( currentCel.getDisplayValue() )
        
      }
    }
  }
  
  //Logger.log( listItems[0] );
  
  //SpreadsheetApp.getActiveSheet().getRange("A20").setValue("Test!");
  var blip = listItems.length;
  
  // add all list entries formatted in 1 single column
  for( var i = 1; i < blip; i++){
    einkaufsListe.getRange(i, 1, 1, 1).setValue( listItems[i] );  
  }
  
  //return count;
}
