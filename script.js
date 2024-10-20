// Occasions and their specific inputs
const occasionData = {
  annualDay: [
    { label: 'Judges', id: 'judges', type: 'text', placeholder: 'Enter judges\' names' },
    { label: 'Guests', id: 'guests', type: 'text', placeholder: 'Enter guests\' names' },
    { label: 'Performances', id: 'performances', type: 'number', placeholder: 'Enter number of performances' }
  ],
  sportsDay: [
    { label: 'Events', id: 'events', type: 'number', placeholder: 'Enter number of events' },
    { label: 'Coaches', id: 'coaches', type: 'text', placeholder: 'Enter coaches\' names' },
    { label: 'Winners', id: 'winners', type: 'text', placeholder: 'Enter names of winners' }
  ],
  conference: [
    { label: 'Speakers', id: 'speakers', type: 'text', placeholder: 'Enter speakers\' names' },
    { label: 'Topics', id: 'topics', type: 'number', placeholder: 'Enter number of topics' },
    { label: 'Attendees', id: 'attendees', type: 'number', placeholder: 'Enter number of attendees' }
  ],
  workshop: [
    { label: 'Instructors', id: 'instructors', type: 'text', placeholder: 'Enter instructors\' names' },
    { label: 'Modules', id: 'modules', type: 'number', placeholder: 'Enter number of modules' }
    // "Projects" input removed
  ]
};

// The rest of your code (functions to generate the report, etc.) remains unchanged.

// Paragraphs for each occasion
const occasionParagraphs = {
  annualDay: "The Annual Day celebration is a highlight of the year, bringing together students, teachers, and families in a joyous atmosphere. Performances and awards are presented to recognize the hard work and talents of participants. Esteemed guests and judges often grace the occasion, making it even more special. It's a day of reflection, appreciation, and celebration for the entire school community.",
  sportsDay: "Sports Day is an exhilarating event where students showcase their athletic skills. From sprints to long jumps, the competition is fierce, and everyone is eager to win medals. Coaches provide guidance, and the crowd cheers with excitement as winners emerge. It’s not just about competing—Sports Day fosters teamwork, resilience, and a spirit of camaraderie.",
  conference: "Conferences bring together experts, speakers, and attendees to discuss the latest developments in various fields. It’s a platform for networking, learning, and exchanging ideas. Engaging topics and diverse perspectives make each session valuable. Participants leave with new insights and connections, ready to implement innovative strategies in their own work environments.",
  workshop: "Workshops provide hands-on experience, offering participants a chance to develop practical skills. Instructors guide through structured modules, ensuring participants not only understand the theory but also apply it through projects. These sessions encourage collaboration and problem-solving, leaving participants with newfound expertise and confidence in their abilities."
};

// Function to generate dynamic inputs based on occasion
function generateDynamicInputs() {
  const occasion = document.getElementById('occasionSelect').value;
  const dynamicInputs = document.getElementById('dynamicInputs');
  dynamicInputs.innerHTML = ''; // Clear previous inputs

  // Create inputs based on the selected occasion
  occasionData[occasion].forEach(inputData => {
    const label = document.createElement('label');
    label.innerText = `${inputData.label}:`;

    const input = document.createElement('input');
    input.type = inputData.type;
    input.id = inputData.id;
    input.placeholder = inputData.placeholder;

    dynamicInputs.appendChild(label);
    dynamicInputs.appendChild(input);
  });
}

// Initialize dynamic inputs on page load
generateDynamicInputs();

// Update inputs when the occasion is changed
document.getElementById('occasionSelect').addEventListener('change', generateDynamicInputs);

// Generate the report
document.getElementById('generateReport').addEventListener('click', function() {
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const venue = document.getElementById('venue').value;
  const otherInfo = document.getElementById('otherInfo').value;

  const occasion = document.getElementById('occasionSelect').value;
  const dynamicInputs = occasionData[occasion].map(inputData => {
    const inputVal = document.getElementById(inputData.id).value;
    return `<li><strong>${inputData.label}:</strong> ${inputVal || 'N/A'}</li>`;
  }).join('');

  // Get the paragraph based on the occasion
  const occasionParagraph = occasionParagraphs[occasion];

  const report = `
    <h3>${occasion.replace(/([A-Z])/g, ' $1')}</h3>
    <p>${occasionParagraph}</p> <!-- Occasion-specific paragraph -->
    <ul>
      ${dynamicInputs}
      <li><strong>Date:</strong> ${date}</li>
      <li><strong>Time:</strong> ${time}</li>
      <li><strong>Venue Location:</strong> ${venue}</li>
      ${otherInfo ? `<li><strong>Additional Information:</strong> ${otherInfo}</li>` : ''}
    </ul>
  `;

  document.getElementById('reportOutput').innerHTML = report;
});

// Download the report as an HTML file
document.getElementById('downloadReport').addEventListener('click', function() {
  const reportContent = document.getElementById('reportOutput').innerHTML;
  const blob = new Blob([reportContent], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'report.html';
  link.click();
});