import { OwnXml } from './own-xml.model';

export class ExportOwnXml {
    id: number;
    userId: number;
    name: string;
    xml: string;
    lastUpdated: Date;

    constructor(ownXml: OwnXml) {
      this.id = ownXml.id;
      this.userId = ownXml.userId;
      this.name = ownXml.name;
      this.xml = ownXml.xml;
      this.lastUpdated = ownXml.lastUpdated;
    }
  }