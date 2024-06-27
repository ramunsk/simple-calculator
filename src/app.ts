const args = process.argv;

const input = args[2];
if (!input) {
    console.log('Input was not provided!');
    process.exit(1);
}
