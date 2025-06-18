import {en_common} from "./en/common.en.js";
import {homeEN as en_home} from "./en/home.en.js";
import {en_services} from "./en/services.en.js";
import {contactEN as en_contact} from "./en/contact.en.js";
import {en_register} from "./en/register.en.js";
import {en_what_we_do} from "./en/what_we_do.en.js";
import {en_what_we_can_do} from "./en/what_we_can_do.en.js";
import {en_support} from "./en/support.en.js";
import {en_privacy_policy} from "./en/privacy_policy.en.js";
import {en_faq} from "./en/faq.en.js";
import {en_footer} from "./en/footer.en.js";
import {en_cookie} from "./en/cookie.en.js";
import {en_popups} from "./en/popups.en.js";
import {en_plans} from "./en/plans.en.js";
import {en_errors} from "./en/errors.en.js";
import {personalAccountsEN} from "./en/personal_accounts.en.js";
import {businessSolutionsEN} from "./en/business_solutions.en.js";
import {serviceDetailsEN} from "./en/service_details.en.js";
import moneyEN from "./en/money.en.js"; // added

import {fr_common} from "./fr/common.fr.js";
import {homeFR as fr_home} from "./fr/home.fr.js";
import {fr_services} from "./fr/services.fr.js";
import {contactFR as fr_contact} from "./fr/contact.fr.js";
import {fr_register} from "./fr/register.fr.js";
import {fr_what_we_do} from "./fr/what_we_do.fr.js";
import {fr_what_we_can_do} from "./fr/what_we_can_do.fr.js";
import {fr_support} from "./fr/support.fr.js";
import {fr_privacy_policy} from "./fr/privacy_policy.fr.js";
import {fr_faq} from "./fr/faq.fr.js";
import {fr_footer} from "./fr/footer.fr.js";
import {fr_cookie} from "./fr/cookie.fr.js";
import {fr_popups} from "./fr/popups.fr.js";
import {fr_plans} from "./fr/plans.fr.js";
import {fr_errors} from "./fr/errors.fr.js";
import {personalAccountsFR} from "./fr/personal_accounts.fr.js";
import {businessSolutionsFR} from "./fr/business_solutions.fr.js";
import {serviceDetailsFR} from "./fr/service_details.fr.js";
import moneyFR from "./fr/money.fr.js"; // added

export const enTranslations = {
    ...en_common, ...en_home, ...en_services, ...en_contact, ...en_register, ...en_what_we_do, ...en_what_we_can_do, ...en_support, ...en_privacy_policy, ...en_faq, ...en_footer, ...en_cookie, ...en_popups, ...en_plans, ...en_errors, ...personalAccountsEN, ...businessSolutionsEN, ...serviceDetailsEN, ...moneyEN // added
};

export const frTranslations = {
    ...fr_common, ...fr_home, ...fr_services, ...fr_contact, ...fr_register, ...fr_what_we_do, ...fr_what_we_can_do, ...fr_support, ...fr_privacy_policy, ...fr_faq, ...fr_footer, ...fr_cookie, ...fr_popups, ...fr_plans, ...fr_errors, ...personalAccountsFR, ...businessSolutionsFR, ...serviceDetailsFR, ...moneyFR // added
};
