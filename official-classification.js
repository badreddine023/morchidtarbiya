/* التصنيف الرسمي لأسئلة بنك QCM — مبني على بطاقة توصيف دورة نوفمبر 2026. */
(() => {
  const D = window.MORCHID_DATA;
  if (!D || !Array.isArray(D.qcm) || !Array.isArray(D.deepUnits)) throw new Error('Official QCM taxonomy loaded before content data');
  const axisGroup = {"growth-development": "psychology", "learning-obstacles": "psychology", "competency-approach": "pedagogy", "teaching-strategies": "pedagogy", "school-sociology": "sociology", "group-communication": "sociology"};
  const groups = [{"id": "psychology", "title": "علم النفس التربوي", "weight": "40%"}, {"id": "pedagogy", "title": "المقاربات البيداغوجية", "weight": "30%"}, {"id": "sociology", "title": "سوسيولوجيا التربية ودينامية الجماعة", "weight": "30%"}];
  const axes = D.deepUnits.map(unit => {
    const groupId = axisGroup[unit.id];
    if (!groupId) throw new Error(`Missing official group for axis ${unit.id}`);
    return {
      id: unit.id,
      title: unit.level.replace(/^المجال\s+[^·]+·\s*/, ''),
      level: unit.level,
      lessonTitle: unit.title,
      groupId,
      weight: unit.weight,
      weightValue: Number.parseFloat(unit.weight) / 100,
      qcmIds: [...(unit.qcmIds || [])],
    };
  });
  const assignments = {
  "scheme-triangle": {
    "axisId": "learning-obstacles",
    "groupId": "psychology",
    "confidence": "medium",
    "needsReview": true
  },
  "scheme-lesson": {
    "axisId": "teaching-strategies",
    "groupId": "pedagogy",
    "confidence": "high",
    "needsReview": false
  },
  "scheme-bloom": {
    "axisId": "competency-approach",
    "groupId": "pedagogy",
    "confidence": "high",
    "needsReview": false
  },
  "scheme-evaluation": {
    "axisId": "competency-approach",
    "groupId": "pedagogy",
    "confidence": "medium",
    "needsReview": false
  },
  "scheme-learning-theories": {
    "axisId": "learning-obstacles",
    "groupId": "psychology",
    "confidence": "high",
    "needsReview": false
  },
  "scheme-competence": {
    "axisId": "competency-approach",
    "groupId": "pedagogy",
    "confidence": "high",
    "needsReview": false
  },
  "scheme-transposition": {
    "axisId": "teaching-strategies",
    "groupId": "pedagogy",
    "confidence": "medium",
    "needsReview": true
  },
  "scheme-objectives": {
    "axisId": "competency-approach",
    "groupId": "pedagogy",
    "confidence": "high",
    "needsReview": false
  },
  "scheme-contract": {
    "axisId": "learning-obstacles",
    "groupId": "psychology",
    "confidence": "medium",
    "needsReview": true
  },
  "scheme-integration": {
    "axisId": "competency-approach",
    "groupId": "pedagogy",
    "confidence": "high",
    "needsReview": false
  },
  "concept-term-0": {
    "axisId": "teaching-strategies",
    "groupId": "pedagogy",
    "confidence": "medium",
    "needsReview": true
  },
  "concept-term-1": {
    "axisId": "teaching-strategies",
    "groupId": "pedagogy",
    "confidence": "medium",
    "needsReview": false
  },
  "concept-term-2": {
    "axisId": "competency-approach",
    "groupId": "pedagogy",
    "confidence": "high",
    "needsReview": false
  },
  "concept-term-3": {
    "axisId": "learning-obstacles",
    "groupId": "psychology",
    "confidence": "medium",
    "needsReview": true
  },
  "concept-term-4": {
    "axisId": "learning-obstacles",
    "groupId": "psychology",
    "confidence": "medium",
    "needsReview": true
  },
  "concept-term-5": {
    "axisId": "teaching-strategies",
    "groupId": "pedagogy",
    "confidence": "medium",
    "needsReview": true
  },
  "concept-term-6": {
    "axisId": "learning-obstacles",
    "groupId": "psychology",
    "confidence": "high",
    "needsReview": false
  },
  "concept-term-7": {
    "axisId": "learning-obstacles",
    "groupId": "psychology",
    "confidence": "medium",
    "needsReview": true
  },
  "concept-term-8": {
    "axisId": "learning-obstacles",
    "groupId": "psychology",
    "confidence": "high",
    "needsReview": false
  },
  "concept-term-9": {
    "axisId": "teaching-strategies",
    "groupId": "pedagogy",
    "confidence": "high",
    "needsReview": false
  },
  "concept-term-10": {
    "axisId": "teaching-strategies",
    "groupId": "pedagogy",
    "confidence": "low",
    "needsReview": true
  },
  "concept-term-11": {
    "axisId": "school-sociology",
    "groupId": "sociology",
    "confidence": "medium",
    "needsReview": true
  },
  "concept-term-12": {
    "axisId": "group-communication",
    "groupId": "sociology",
    "confidence": "medium",
    "needsReview": true
  },
  "concept-term-13": {
    "axisId": "competency-approach",
    "groupId": "pedagogy",
    "confidence": "high",
    "needsReview": false
  },
  "concept-term-14": {
    "axisId": "teaching-strategies",
    "groupId": "pedagogy",
    "confidence": "medium",
    "needsReview": true
  },
  "concept-term-15": {
    "axisId": "competency-approach",
    "groupId": "pedagogy",
    "confidence": "medium",
    "needsReview": true
  },
  "concept-term-16": {
    "axisId": "competency-approach",
    "groupId": "pedagogy",
    "confidence": "medium",
    "needsReview": true
  },
  "concept-term-17": {
    "axisId": "teaching-strategies",
    "groupId": "pedagogy",
    "confidence": "high",
    "needsReview": false
  },
  "concept-term-18": {
    "axisId": "learning-obstacles",
    "groupId": "psychology",
    "confidence": "medium",
    "needsReview": true
  },
  "concept-term-19": {
    "axisId": "teaching-strategies",
    "groupId": "pedagogy",
    "confidence": "medium",
    "needsReview": true
  },
  "extra-01": {
    "axisId": "learning-obstacles",
    "groupId": "psychology",
    "confidence": "medium",
    "needsReview": true
  },
  "extra-02": {
    "axisId": "learning-obstacles",
    "groupId": "psychology",
    "confidence": "high",
    "needsReview": false
  },
  "extra-03": {
    "axisId": "learning-obstacles",
    "groupId": "psychology",
    "confidence": "high",
    "needsReview": false
  },
  "extra-04": {
    "axisId": "competency-approach",
    "groupId": "pedagogy",
    "confidence": "high",
    "needsReview": false
  },
  "extra-05": {
    "axisId": "school-sociology",
    "groupId": "sociology",
    "confidence": "high",
    "needsReview": false
  },
  "extra-06": {
    "axisId": "teaching-strategies",
    "groupId": "pedagogy",
    "confidence": "medium",
    "needsReview": false
  },
  "extra-07": {
    "axisId": "learning-obstacles",
    "groupId": "psychology",
    "confidence": "medium",
    "needsReview": false
  },
  "extra-08": {
    "axisId": "teaching-strategies",
    "groupId": "pedagogy",
    "confidence": "high",
    "needsReview": false
  },
  "extra-09": {
    "axisId": "learning-obstacles",
    "groupId": "psychology",
    "confidence": "high",
    "needsReview": false
  },
  "extra-10": {
    "axisId": "teaching-strategies",
    "groupId": "pedagogy",
    "confidence": "high",
    "needsReview": false
  },
  "growth-01": {
    "axisId": "growth-development",
    "groupId": "psychology",
    "confidence": "high",
    "needsReview": false
  },
  "growth-02": {
    "axisId": "learning-obstacles",
    "groupId": "psychology",
    "confidence": "medium",
    "needsReview": true
  },
  "learning-01": {
    "axisId": "learning-obstacles",
    "groupId": "psychology",
    "confidence": "high",
    "needsReview": false
  },
  "learning-02": {
    "axisId": "learning-obstacles",
    "groupId": "psychology",
    "confidence": "medium",
    "needsReview": true
  },
  "competency-01": {
    "axisId": "competency-approach",
    "groupId": "pedagogy",
    "confidence": "high",
    "needsReview": false
  },
  "competency-02": {
    "axisId": "competency-approach",
    "groupId": "pedagogy",
    "confidence": "high",
    "needsReview": false
  },
  "strategy-01": {
    "axisId": "teaching-strategies",
    "groupId": "pedagogy",
    "confidence": "high",
    "needsReview": false
  },
  "strategy-02": {
    "axisId": "teaching-strategies",
    "groupId": "pedagogy",
    "confidence": "high",
    "needsReview": false
  },
  "socio-01": {
    "axisId": "school-sociology",
    "groupId": "sociology",
    "confidence": "high",
    "needsReview": false
  },
  "socio-02": {
    "axisId": "school-sociology",
    "groupId": "sociology",
    "confidence": "high",
    "needsReview": false
  },
  "group-01": {
    "axisId": "group-communication",
    "groupId": "sociology",
    "confidence": "high",
    "needsReview": false
  },
  "group-02": {
    "axisId": "group-communication",
    "groupId": "sociology",
    "confidence": "high",
    "needsReview": false
  },
  "kolb-qcm-01": {
    "axisId": "learning-obstacles",
    "groupId": "psychology",
    "confidence": "high",
    "needsReview": false
  },
  "kolb-qcm-02": {
    "axisId": "learning-obstacles",
    "groupId": "psychology",
    "confidence": "high",
    "needsReview": false
  },
  "kolb-qcm-03": {
    "axisId": "learning-obstacles",
    "groupId": "psychology",
    "confidence": "high",
    "needsReview": false
  },
  "kolb-qcm-04": {
    "axisId": "learning-obstacles",
    "groupId": "psychology",
    "confidence": "high",
    "needsReview": false
  }
};
  const axesById = new Map(axes.map(axis => [axis.id, axis]));
  const questionsById = new Map(D.qcm.map(question => [question.id, question]));
  if (Object.keys(assignments).length !== D.qcm.length) throw new Error(`Expected one classification per QCM; got ${Object.keys(assignments).length} for ${D.qcm.length} questions`);
  for (const [id, record] of Object.entries(assignments)) {
    const question = questionsById.get(id);
    const axis = axesById.get(record.axisId);
    if (!question || !axis || record.groupId !== axis.groupId) throw new Error(`Invalid taxonomy record for ${id}`);
    question.officialAxisId = record.axisId;
    question.officialGroupId = record.groupId;
    question.officialClassificationConfidence = record.confidence;
    question.officialClassificationNeedsReview = record.needsReview;
  }
  for (const unit of D.deepUnits) {
    for (const id of unit.qcmIds || []) {
      const question = questionsById.get(id);
      if (!question || question.officialAxisId !== unit.id) throw new Error(`Deep unit ${unit.id} links to QCM ${id} assigned to a different official axis`);
    }
  }
  const legacyDomainGroupMap = {
    learning:'psychology', psychology:'psychology', pedagogy:'pedagogy',
    didactics:'pedagogy', assessment:'pedagogy', curriculum:'pedagogy',
    sociology:'sociology', innovation:'pedagogy',
  };
  D.officialTaxonomy = {
    version: 'men-qcm-2026-11',
    groups: groups.map(group => ({...group, axes: axes.filter(axis => axis.groupId === group.id).map(axis => axis.id)})),
    axes,
    assignments,
    legacyDomainGroupMap,
    source: (D.deepSources || []).find(source => source.url.includes('men.gov.ma')) || null,
  };
  window.MORCHID_TAXONOMY = D.officialTaxonomy;
})();
