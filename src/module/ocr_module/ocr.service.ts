import { Injectable } from '@nestjs/common';
import {
  TextractClient,
  DetectDocumentTextCommand,
} from '@aws-sdk/client-textract';

@Injectable()
export class OcrService {
  constructor() {}

  async formatText(inputString: string) {
    const extractedData: any = {};
    const pt_cc_pn_pattern = /Passport No (.*?) Name/;
    const pt_cc_pn_match = inputString.match(pt_cc_pn_pattern);
    const extracted_pt_cc_pn = pt_cc_pn_match
      ? pt_cc_pn_match[1].trim()
      : false;
    if (extracted_pt_cc_pn) {
      const passportType = extracted_pt_cc_pn
        ? extracted_pt_cc_pn.split(' ')[0]
        : false;
      const passportCountryCode = extracted_pt_cc_pn
        ? extracted_pt_cc_pn.split(' ')[1]
        : false;
      const passportNo = extracted_pt_cc_pn
        ? extracted_pt_cc_pn.split(' ')[2]
        : false;

      extractedData.passportType = passportType;
      extractedData.CountryCode = passportCountryCode;
      extractedData.passportNo = passportNo;
    }

    // name
    const name_pattern = /Name (.*?) Nationality/;
    const name_match = inputString.match(name_pattern);
    const extracted_name = name_match ? name_match[1].trim() : false;
    if (extracted_name) extractedData.name = extracted_name;

    // nationality
    const nationality_pattern = /Nationality (.*?) Date of birth/;
    const nationality_match = inputString.match(nationality_pattern);
    const extracted_nationality = nationality_match
      ? nationality_match[1].trim()
      : false;
    if (extracted_nationality)
      extractedData.nationality = extracted_nationality;

    // date of birth
    const date_of_birth_pattern = /Date of birth (.*?) Sex/;
    const date_of_birth_match = inputString.match(date_of_birth_pattern);
    const extracted_date_of_birth = date_of_birth_match
      ? date_of_birth_match[1].trim()
      : false;
    if (extracted_date_of_birth)
      extractedData.date_of_birth = extracted_date_of_birth;

    // sex, place of birdth
    const sex_pattern = /Place of birth (.*?) Date of issue Authority/;
    const sex_match = inputString.match(sex_pattern);
    const extracted_sex = sex_match ? sex_match[1].trim() : false;
    if (extracted_sex) {
      extractedData.sex = extracted_sex.split(' ')[0];
      extractedData.placeOfBirth = extracted_sex.split(' ')[1];
    }

    // date of issue, authority
    const date_of_issue_pattern = /Authority (.*?) Date of expiry/;
    const date_of_issue_match = inputString.match(date_of_issue_pattern);
    const extracted_date_of_issue = date_of_issue_match
      ? date_of_issue_match[1].trim()
      : false;

    if (extracted_date_of_issue) {
      extractedData.date_of_issue = extracted_date_of_issue
        .split(' ')
        .slice(0, 3)
        .join(' ');
      extractedData.authority = extracted_date_of_issue
        .split(' ')
        .slice(3, extracted_date_of_issue.length)
        .join(' ');
    }

    // date of expiry
    const date_of_expiry_pattern = /signature (.*)/;
    const date_of_expiry_match = inputString.match(date_of_expiry_pattern);
    const extracted_date_of_expiry = date_of_expiry_match
      ? date_of_expiry_match[1].trim()
      : false;
    if (extracted_date_of_expiry) {
      extractedData.date_of_expiry = extracted_date_of_expiry
        .split(' ')
        .slice(0, 3)
        .join(' ');
    }

    return extractedData;
  }

  async extractText(file: Express.Multer.File): Promise<any> {
    const textractClient = new TextractClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const params = {
      Document: {
        Bytes: file.buffer,
      },
    };

    try {
      const command = new DetectDocumentTextCommand(params);
      const data = await textractClient.send(command);

      const extractedText = data.Blocks?.filter(
        (block) => block.BlockType === 'LINE',
      )
        .map((block) => block.Text)
        .join(' ');

      return this.formatText(extractedText || '');
    } catch (err) {
      console.error('Error extracting text:', err);
      throw new Error('Error extracting text');
    }
  }
}
