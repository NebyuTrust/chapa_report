/**
 * Abstract class for the reporter class
 */
export abstract class AChapaReporter {
  abstract fileReader(): void;
  abstract checkFileExists(): boolean;
  abstract printSuccess(result: Report.IFileReaderResult): void;
  abstract printError(): void;
}

// Interface for data coming from chapa csv report
declare global {
  namespace Report {
    interface IReport {
      Status: string;
      Amount: string;
      Charge: string;
    }
    interface IFileReaderResult {
      successResult: number;
      successTransactions: number;
    }
  }
}
