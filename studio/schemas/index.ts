import { journalEntry, journalBody } from './journalEntry';
import { socialLink } from './objects/socialLink';
import { educationItem } from './objects/educationItem';
import { hardwareDetails } from './objects/hardwareDetails';
import { projectDocument } from './objects/projectDocument';
import { portableText } from './objects/portableText';

import { profile } from './profile';
import { siteSettings } from './siteSettings';
import { resume } from './resume';
import { project } from './project';
import { experience } from './experience';
import { skill } from './skill';
import { achievement } from './achievement';
import { documentCategory } from './documentCategory';
import { technicalDocument } from './technicalDocument';

export const schemaTypes = [
  journalEntry, journalBody,
  // Object types
  socialLink,
  educationItem,
  hardwareDetails,
  projectDocument,
  portableText,

  // Singletons
  profile,
  siteSettings,
  resume,

  // Document collections
  project,
  documentCategory,
  technicalDocument,
  experience,
  skill,
  achievement,
];
