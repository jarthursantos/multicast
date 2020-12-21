import { Router, Response } from 'express'
import { findSalesByProviderPerActivityBranchController } from 'use-cases/FindSalesByProviderPerActivityBranch'
import { findSalesByProviderPerCategoryController } from 'use-cases/FindSalesByProviderPerCategory'
import { findSalesByProviderPerCategoryProductController } from 'use-cases/FindSalesByProviderPerCategoryProduct'
import { findSalesByProviderPerClientController } from 'use-cases/FindSalesByProviderPerClient'
import { findSalesByProviderPerClientLitigationController } from 'use-cases/FindSalesByProviderPerClientLitigation'
import { findSalesByProviderPerClientSalesValueController } from 'use-cases/FindSalesByProviderPerClientSalesValue'
import { findSalesByProviderPerProductProviderController } from 'use-cases/FindSalesByProviderPerProductProvider'
import { findSalesByProviderPerProductSalesCountController } from 'use-cases/FindSalesByProviderPerProductSalesCount'
import { findSalesByProviderPerProductSalesValueController } from 'use-cases/FindSalesByProviderPerProductSalesValue'
import { findSalesByProviderPerProviderGoalController } from 'use-cases/FindSalesByProviderPerProviderGoal'
import { findSalesByProviderPerProviderLitigationController } from 'use-cases/FindSalesByProviderPerProviderLitigation'
import { findSalesByProviderPerRCAController } from 'use-cases/FindSalesByProviderPerRCA'
import { findSalesByProviderPerRCASalesValueController } from 'use-cases/FindSalesByProviderPerRCASalesValue'
import { findSalesByProviderPerRegionController } from 'use-cases/FindSalesByProviderPerRegion'
import { findSalesByProviderPerRouteController } from 'use-cases/FindSalesByProviderPerRoute'
import { findSalesByProviderPerSquareController } from 'use-cases/FindSalesByProviderPerSquare'
import { findSalesByProviderPerSquareClientProductController } from 'use-cases/FindSalesByProviderPerSquareClientProduct'
import { findSalesByProviderPerSupervisorController } from 'use-cases/FindSalesByProviderPerSupervisor'
import { findSalesByProviderPerSupervisorRCAController } from 'use-cases/FindSalesByProviderPerSupervisorRCA'
import { FindSalesByProviderRequest } from 'utils/parse-sales-by-provider-options'

const router = Router()

router.get(
  '/salesByProviders/clients',
  (req: FindSalesByProviderRequest, res: Response) => {
    findSalesByProviderPerClientController.handle(req, res)
  }
)

router.get(
  '/salesByProviders/activityBranches',
  (req: FindSalesByProviderRequest, res: Response) => {
    findSalesByProviderPerActivityBranchController.handle(req, res)
  }
)

router.get(
  '/salesByProviders/regions',
  (req: FindSalesByProviderRequest, res: Response) => {
    findSalesByProviderPerRegionController.handle(req, res)
  }
)

router.get(
  '/salesByProviders/squares',
  (req: FindSalesByProviderRequest, res: Response) => {
    findSalesByProviderPerSquareController.handle(req, res)
  }
)

router.get(
  '/salesByProviders/routes',
  (req: FindSalesByProviderRequest, res: Response) => {
    findSalesByProviderPerRouteController.handle(req, res)
  }
)

router.get(
  '/salesByProviders/supervisors',
  (req: FindSalesByProviderRequest, res: Response) => {
    findSalesByProviderPerSupervisorController.handle(req, res)
  }
)

router.get(
  '/salesByProviders/supervisorRCAs',
  (req: FindSalesByProviderRequest, res: Response) => {
    findSalesByProviderPerSupervisorRCAController.handle(req, res)
  }
)

router.get(
  '/salesByProviders/rcas',
  (req: FindSalesByProviderRequest, res: Response) => {
    findSalesByProviderPerRCAController.handle(req, res)
  }
)

router.get(
  '/salesByProviders/products',
  (req: FindSalesByProviderRequest, res: Response) => {
    findSalesByProviderPerProductProviderController.handle(req, res)
  }
)

router.get(
  '/salesByProviders/categories',
  (req: FindSalesByProviderRequest, res: Response) => {
    findSalesByProviderPerCategoryController.handle(req, res)
  }
)

router.get(
  '/salesByProviders/categoryProducts',
  (req: FindSalesByProviderRequest, res: Response) => {
    findSalesByProviderPerCategoryProductController.handle(req, res)
  }
)

router.get(
  '/salesByProviders/clientSalesValues',
  (req: FindSalesByProviderRequest, res: Response) => {
    findSalesByProviderPerClientSalesValueController.handle(req, res)
  }
)

router.get(
  '/salesByProviders/productSalesCounts',
  (req: FindSalesByProviderRequest, res: Response) => {
    findSalesByProviderPerProductSalesCountController.handle(req, res)
  }
)

router.get(
  '/salesByProviders/productSalesValues',
  (req: FindSalesByProviderRequest, res: Response) => {
    findSalesByProviderPerProductSalesValueController.handle(req, res)
  }
)

router.get(
  '/salesByProviders/squareClientProducts',
  (req: FindSalesByProviderRequest, res: Response) => {
    findSalesByProviderPerSquareClientProductController.handle(req, res)
  }
)

router.get(
  '/salesByProviders/clientLitigations',
  (req: FindSalesByProviderRequest, res: Response) => {
    findSalesByProviderPerClientLitigationController.handle(req, res)
  }
)

router.get(
  '/salesByProviders/providerGoals',
  (req: FindSalesByProviderRequest, res: Response) => {
    findSalesByProviderPerProviderGoalController.handle(req, res)
  }
)

router.get(
  '/salesByProviders/providerLitigations',
  (req: FindSalesByProviderRequest, res: Response) => {
    findSalesByProviderPerProviderLitigationController.handle(req, res)
  }
)

router.get(
  '/salesByProviders/rcaSalesValues',
  (req: FindSalesByProviderRequest, res: Response) => {
    findSalesByProviderPerRCASalesValueController.handle(req, res)
  }
)

export { router as salesByProvidersRouter }
