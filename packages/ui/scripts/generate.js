const { generateTemplateFiles } = require('generate-template-files')

generateTemplateFiles([
    {
        option: 'Create UI Component',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './scripts/templates/default'
        },
        stringReplacers: [
            {
                question: 'Insert folder name (inside ./src)',
                slot: '__folder__'
            },
            {
                question: 'Atomic design level (atom | molecule | organism)',
                slot: '__atomicity__'
            },
            { question: 'Insert your component name', slot: '__name__' }
        ],
        output: {
            path: './src/__folder__(kebabCase)/__name__(pascalCase)',
            pathAndFileNameDefaultCase: '(pascalCase)',
            overwrite: false
        }
    },
    {
        option: 'Create UI Icon',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './scripts/templates/icon'
        },
        stringReplacers: [
            { question: 'Insert your component name', slot: '__name__' },
            { question: 'Insert your path svg', slot: '__path__' }
        ],
        output: {
            path: './src/icon/__name__(pascalCase)',
            pathAndFileNameDefaultCase: '(pascalCase)',
            overwrite: true
        }
    }
])
