// Chapa report
import ChapaReporter from "./app";

const filePath = process.argv[2];

// Check if there is a file path
if (!filePath) throw new Error("File path is required");

const reporter = new ChapaReporter(filePath);
reporter.fileReader();
