
document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue() {
    const getInputValue = (id) => document.getElementById(id).value;
    const description = getInputValue('issueDescription');
    const severity = getInputValue('issueSeverity');
    const assignedTo = getInputValue('issueAssignedTo');
    const id = Math.floor(Math.random() * 100000000) + '';
    const status = 'Open';

    const issue = { id, description, severity, assignedTo, status };
    let issues = [];
    if (localStorage.getItem('issues')) {
        issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('issueInputForm').reset();
    fetchIssues();
}

const closeIssue = (id) => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const currentIssue = issues.find((issue) => issue.id === id);
    currentIssue.status = 'Closed';
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

const deleteIssue = (id) => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const remainingIssues = issues.filter((issue) => issue.id !== id);
    localStorage.setItem('issues', JSON.stringify(remainingIssues));
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  const titleElement = document.querySelector('h1');

  if (issues && issues.length > 0) {
      titleElement.innerHTML = `Issue Tracker: ${issues.length} Issues`;
      issuesList.innerHTML = '';

      for (var i = 0; i < issues.length; i++) {
          const { id, description, severity, assignedTo, status } = issues[i];

          issuesList.innerHTML += `<div id="issue-form" class="well">
              <h6>Issue ID: ${id} </h6>
              <p><span class="label label-info"> ${status} </span></p>
              <h3 id="description-issue" >${description}</h3>
              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
              <button id="close-btn" class="btn btn-warning" onclick="closeIssue('${id}')">Close</button>
              <button id="delete" class="btn btn-danger" onclick="deleteIssue('${id}')">Delete</button>
          </div>`;
      }
  } else {
      titleElement.innerHTML = 'Issue Tracker: No Issues';
      issuesList.innerHTML = '';
  }
  const closeIssueWorking = document.getElementById('close-btn');
   closeIssueWorking.addEventListener('click', function() {
    document.getElementById('description-issue').style.textDecorationLine = 'line-through';
  });

  const deleteIssueWOrking = document.getElementById('delete');
  deleteIssueWOrking.addEventListener('click', function(){
  document.getElementById('issue-form').style.display = 'none';
 });


};

fetchIssues();
