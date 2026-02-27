$pages = @(
    "Home", "Services", "Packages", "Booking", "Gallery", "About", "Contact",
    "Login", "Register", "UserDashboard", "AdminDashboard"
)

foreach ($page in $pages) {
    $content = "import React from 'react';`n`nconst ${page}: React.FC = () => {`n  return (`n    <div className=`"page-container section`">`n      <div className=`"container`">`n        <h1>$page</h1>`n      </div>`n    </div>`n  );`n};`n`nexport default $page;"
    $path = "e:\project vj\src\pages\$page.tsx"
    Set-Content -Path $path -Value $content
}

$components = @("Navbar", "Footer")
foreach ($comp in $components) {
    $content = "import React from 'react';`nimport { Link } from 'react-router-dom';`n`nconst ${comp}: React.FC = () => {`n  return (`n    <div className=`"${comp.ToLower()}`">`n      <h2>$comp</h2>`n    </div>`n  );`n};`n`nexport default ${comp};"
    $path = "e:\project vj\src\components\$comp.tsx"
    Set-Content -Path $path -Value $content
}
