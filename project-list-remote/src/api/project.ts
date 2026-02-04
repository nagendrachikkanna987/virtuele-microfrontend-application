import axiosInstance from './axiosConfig';
import { Project } from '../store/slices/projectSlice';

type ApiProject = Record<string, unknown>;

const safeToString = (value: unknown) => {
  if (value === undefined || value === null) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return value.toString();
  }
  return '';
};

const normalizeProject = (project: ApiProject): Project | null => {
  const name = safeToString(
    project.projectName ?? project.name ?? project.displayName ?? project.title
  );

  if (!name) {
    return null;
  }

  const jobNumber = safeToString(
    project.jobNumber ?? project.projectNumber ?? project.jobNo ?? project.jobId
  );

  const idCandidate =
    project.id ??
    project.projectId ??
    project.guid ??
    project.projectCode ??
    project.uid ??
    project.baseProjectId ??
    `${name}-${jobNumber || 'open'}`;

  const id = safeToString(idCandidate) || `${name}-${jobNumber || 'open'}`;
  const status = safeToString(project.status ?? project.projectStatus ?? 'active');

  return {
    id,
    name,
    jobNumber,
    status,
  };
};

const isProject = (value: Project | null): value is Project => value !== null;

const extractProjectsFromResponse = (payload: unknown): ApiProject[] => {
  if (Array.isArray(payload)) {
    return payload as ApiProject[];
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const bucket = payload as Record<string, unknown>;
  const candidateKeys = ['projects', 'data', 'result', 'projectBaseInfo', 'projectList', 'items'];

  for (const key of candidateKeys) {
    const candidate = bucket[key];
    if (Array.isArray(candidate)) {
      return candidate as ApiProject[];
    }
  }

  return [];
};

export type ProjectListPayload = {
  companyId: number;
  userId: number;
  projectStatus?: string;
};

export const fetchProjectList = async (
  payload: ProjectListPayload,
  signal?: AbortSignal
): Promise<Project[]> => {
  debugger;
  const response = await axiosInstance.post(
    '/api/project/list/base-info',
    {
      ...payload,
      projectStatus: payload.projectStatus ?? 'OPEN',
    },
    { signal }
  );

  return extractProjectsFromResponse(response.data).map(normalizeProject).filter(isProject);
};
