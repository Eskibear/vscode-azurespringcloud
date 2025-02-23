// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureWizardExecuteStep } from "@microsoft/vscode-azext-utils";
import { Progress } from "vscode";
import { ext } from "../../../extensionVariables";
import { EnhancedDeployment } from "../../../service/EnhancedDeployment";
import { localize } from "../../../utils";
import { IAppDeploymentWizardContext } from "./IAppDeploymentWizardContext";

export class UpdateDeploymentStep extends AzureWizardExecuteStep<IAppDeploymentWizardContext> {

    public priority: number = 140;
    private readonly deployment: EnhancedDeployment;

    constructor(deployment: EnhancedDeployment) {
        super();
        this.deployment = deployment;
    }

    public async execute(context: IAppDeploymentWizardContext, progress: Progress<{ message?: string; increment?: number }>): Promise<void> {
        const message: string = localize('updateDeployment', 'Updating deployment...');
        ext.outputChannel.appendLog(message);
        progress.report({ message });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await this.deployment.updateArtifactPath(context.relativePathOrBuildResultId!);
        ext.outputChannel.appendLog(localize('updateDeploymentSuccess', 'Successfully updated deployment.'));
    }

    public shouldExecute(_context: IAppDeploymentWizardContext): boolean {
        return true;
    }
}
