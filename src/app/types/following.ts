export type Following = {
    _id: string;
    following: Array<{
        following: {
            _id: string;
            displayName: string;
            email: string;
            createdAt: string;
        };
    }>;
  };