const fs = require('fs');
const glob = require('glob'); // Need to install or use native fs recursive

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace "import { Type" with "import type { Type" for types.
    // A simple regex approach for this specific project structure:
    content = content.replace(/import\s+\{([^}]+)\}\s+from\s+['"]([^'"]*types[^'"]*)['"];/g, (match, p1, p2) => {
        return `import type {${p1}} from '${p2}';`;
    });
    
    // Specific fixes
    if (filePath.includes('App.tsx')) {
        content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState } from 'react';");
    }
    
    if (filePath.includes('exportPdf.ts')) {
        content = content.replace("image: { type: 'jpeg', quality: 0.98 }", "image: { type: 'jpeg' as const, quality: 0.98 }");
    }

    if (filePath.includes('achievementLevels.ts')) {
       content = content.replace("import type { AchievementLevel }", "import type { AchievementLevel, AchievementLevelId }");
    }

    fs.writeFileSync(filePath, content);
}

const files = [
    'src/App.tsx',
    'src/components/MeetingInfoForm.tsx',
    'src/components/MinutesPreview.tsx',
    'src/components/TeachersPanel.tsx',
    'src/data/achievementLevels.ts',
    'src/data/agendaItems.ts',
    'src/data/branchSpeechStyles.ts',
    'src/data/gradeProfiles.ts',
    'src/data/sampleTeachers.ts',
    'src/utils/exportDocx.ts',
    'src/utils/exportPdf.ts',
    'src/utils/generateMinutes.ts',
    'src/utils/teacherSelector.ts'
];

files.forEach(fixFile);
console.log('Fixed imports');
