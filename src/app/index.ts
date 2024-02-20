import { createReadStream, existsSync } from "fs";
import csvParser from "csv-parser";

import { AChapaReporter } from "./dto";

/**
 * Chapa reporter class
 */
export default class ChapaReporter extends AChapaReporter {
  constructor(public filePath: string) {
    super();
    this.filePath = filePath;
  }

  checkFileExists(): boolean {
    if (existsSync(this.filePath)) {
      return true;
    } else {
      return false;
    }
  }

  fileReader(): void {
    if (this.checkFileExists()) {
      const results: Report.IReport[] = [];

      createReadStream(this.filePath)
        .pipe(csvParser())
        .on("data", (data) => {
          results.push(data);
        })
        .on("end", () => {
          // Filter the data and sum up the success
          let successResult = 0;
          let successTransactions = 0;
          results.forEach((result) => {
            if (result.Status === "Success") {
              let tempAmount =
                parseFloat(result.Amount) - parseFloat(result.Charge);
              successResult += tempAmount;
              successTransactions++;
            }
          });
          this.printSuccess({ successResult, successTransactions });
        });
    } else {
      this.printError();
    }
  }

  printSuccess(data: Report.IFileReaderResult): void {
    const tax = parseFloat((data.successResult * 0.15).toFixed(2));
    const revenue = parseFloat(data.successResult.toFixed(2));
    const profit = revenue - tax;

    console.log(
      `Total number of successfull transactions - ${data.successTransactions}`
    );
    console.log(
      `Total successfull revenue collected after Chapa charge, and before VAT (15%) - ${revenue} Birr`
    );
    console.log(`VAT (15%) - ${tax} Birr`);
    console.log(`Total profit after VAT - ${profit}`);
  }

  printError(): void {
    console.log(`Error`);
    console.log(`File does not exists with the specified path`);
  }
}
