export const buildFunctions = (words) => {
  const getTag = (xn, name) => {
    const f = (s) => {
      const res = words.tags[name][s];
      if (!res) return words.tagMeta.util.error;
      return res;
    };
    if (typeof xn !== 'string') return xn.map(f).join('، ');
    return f(xn);
  };
  const getMoney = (xn) => {
    if (xn === 'na') return 'غیر قابل محاسبه';
    if (xn >= 1000) {
      return `${xn/1000} میلیارد دلار`;
    }
    return `${xn} میلیون دلار`;
  };
  return {
    getValue: (x, name) => {
      const xn = x[name];
      if (!xn) return words.tagMeta.util.empty;
      const typ = words.tagMeta.type[name];
      if (typ === 'tag') {
        return getTag(xn, name);
      }
      if (typ === 'money') {
        return getMoney(xn);
      }
      return xn;
    },
  };
};
