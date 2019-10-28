import { TEtoSpecsData } from "../../../lib/api/eto/EtoApi.interfaces.unsafe";
import { TEtoWithCompanyAndContract } from "../../../modules/eto/types";

export const getInvestmentCalculatedPercentage = (eto: TEtoSpecsData) =>
  (eto.newSharesToIssue / eto.minimumNewSharesToIssue) * 100;

export const getCurrentInvestmentProgressPercentage = (eto: TEtoWithCompanyAndContract) => {
  const totalTokensInt = eto.contract!.totalInvestment.totalTokensInt;

  return (
    (parseInt(totalTokensInt, 10) / (eto.minimumNewSharesToIssue * eto.equityTokensPerShare)) * 100
  );
};
