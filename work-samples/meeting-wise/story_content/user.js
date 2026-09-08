window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
var getKeyDown = player.getKeyDown;
var keydown = player.keydown;
var keyup = player.keyup;
window.Script2 = function()
{
  // 1. Get the learner's name variable from Storyline
var player = GetPlayer();
var learnerName = player.GetVar("TextEntry");

// 2. Load jsPDF library dynamically
if (typeof jspdf === "undefined") {
  var script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  script.onload = function() {
    generatePDF(learnerName);
  };
  document.head.appendChild(script);
} else {
  generatePDF(learnerName);
}

// 3. Generate and download the PDF certificate
function generatePDF(name) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4'
  });

  // Certificate Border
  doc.setDrawColor(40, 60, 100);
  doc.setLineWidth(5);
  doc.rect(20, 20, 802, 555); // Outer Border

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(36);
  doc.setTextColor(40, 60, 100);
  doc.text("CERTIFICATE OF COMPLETION", 421, 140, { align: "center" });

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(18);
  doc.setTextColor(100, 100, 100);
  doc.text("This is proudly presented to", 421, 210, { align: "center" });

  // Learner Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(32);
  doc.setTextColor(20, 20, 20);
  doc.text(name || "Learner", 421, 280, { align: "center" });

  // Course Description Text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(16);
  doc.setTextColor(100, 100, 100);
  doc.text(
    "for successfully completing the course requirements for Meeting Wise",
    421,
    340,
    { align: "center" }
  );
  doc.text(
    "and being ready to lead better.",
    421,
    365,
    { align: "center" }
  );

  // Save / Download PDF
  doc.save("Meeting_Wise_Certificate.pdf");
}
}

};
