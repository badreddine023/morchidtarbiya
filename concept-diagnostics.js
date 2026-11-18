(function () {
  const D = window.MORCHID_DATA;
  if (!D) return;

  D.conceptDiagnostics = {
    concepts: {
      'competency-resource-mobilization': { label: 'تعبئة الموارد في وضعية دالة' },
      'formative-assessment': { label: 'استثمار نتائج التقويم التكويني' },
      'scaffolding-zpd': { label: 'السقالة والدعم المؤقت' },
      'pedagogical-differentiation': { label: 'التمايز مع الحفاظ على هدف مشترك' },
    },
    questions: {
      'scheme-competence': {
        conceptId: 'competency-resource-mobilization', partnerQuestionId: 'competency-02',
        errors: {
          0: { id: 'competence-as-administration', patternId: 'competency-administrative', label: 'فصل الكفاية عن التعلم', feedback: 'يخلط هذا الاختيار بين الكفاية والشأن الإداري، مع أن السؤال يربطها بتوظيف المتعلم لموارده في وضعية جديدة ودالة.', remediation: 'أعِد صياغة الفكرة بذكر ما يفعله المتعلم بموارده في وضعية جديدة.', theoryId: 'integration' },
          1: { id: 'knowledge-only-competence', patternId: 'competency-as-recall', label: 'اختزال الكفاية في المعرفة', feedback: 'المعارف وحدها لا تعبّر عن تعبئة الموارد؛ فالاختيار الصحيح يضم المعارف والمهارات والمواقف.', remediation: 'درّب نفسك على استكمال الثلاثية: معارف، مهارات، مواقف.', theoryId: 'integration' },
          3: { id: 'competence-as-repetition', patternId: 'competency-as-reproduction', label: 'مساواة الكفاية بالحفظ والترديد', feedback: 'الحفظ والترديد لا يبيّنان توظيف الموارد في وضعية جديدة ودالة، وهو ما يوضحه التفسير للكفاية.', remediation: 'حوّل معلومة محفوظة إلى استعمال لها في وضعية جديدة، ثم حدّد الموارد التي وظّفتها.', theoryId: 'integration' },
        },
      },
      'competency-02': {
        conceptId: 'competency-resource-mobilization', partnerQuestionId: 'scheme-competence',
        errors: {
          0: { id: 'competency02-memorization-only', patternId: 'competency-as-recall', label: 'اختزال الكفاية في الحفظ', feedback: 'يخلط هذا الاختيار بين معرفة التعريفات والقدرة على تعبئة موارد مناسبة؛ فالحفظ وحده لا يعالج وضعية جديدة أو مركبة.', remediation: 'تدرّب على شرح كيف توظّف موردين مختلفين لمعالجة وضعية جديدة، بدل الاكتفاء باستظهار تعريفهما.', theoryId: 'bloom' },
          2: { id: 'competency02-rigid-imitation', patternId: 'competency-as-reproduction', label: 'الخلط بين الكفاية والتقليد الآلي', feedback: 'يفترض هذا الاختيار أن تكرار نموذج المدرس يكفي، مع أن الكفاية تتطلب ملاءمة تعبئة الموارد للوضعية، لا نسخ النموذج دون تعديل.', remediation: 'خذ نموذجًا مألوفًا، وحدّد تعديلًا واحدًا يجعله ملائمًا لوضعية جديدة.', theoryId: 'integration' },
          3: { id: 'competency02-speed-priority', patternId: 'competency-speed-priority', label: 'تقديم السرعة على ملاءمة الإنجاز', feedback: 'يركّز هذا الاختيار على إنجاز المهمة بسرعة فقط، بينما الأساس هو ملاءمة تعبئة الموارد لمعالجة الوضعية.', remediation: 'عند حل مهمة، اذكر أولًا الموارد الملائمة وكيف ستوظفها، ثم راجع السرعة بعد ذلك.', theoryId: 'integration' },
        },
      },
      'concept-term-15': {
        conceptId: 'formative-assessment', partnerQuestionId: 'extra-04',
        errors: {
          0: { id: 'formative-vs-summative', patternId: 'formative-as-timing-only', label: 'الخلط بين التكويني والختامي', feedback: 'يخلط هذا الاختيار بين التقويم أثناء التعلم والتقويم في نهاية وحدة للحكم على الحصيلة؛ لذلك يغيب عنه توقيت التقويم واستثمار نتائجه لتعديل التدريس.', remediation: 'حدّد متى يحدث التقويم في هذا التعريف: أثناء التعلم أم في نهايته؟ ثم اذكر ما يُفعل بنتائجه.', theoryId: 'skinner' },
          1: { id: 'formative-vs-self-regulation', patternId: 'formative-vs-self-regulation', label: 'الخلط بين التقويم وتنظيم المتعلم لتعلمه', feedback: 'يصف الاختيار قدرة المتعلم على متابعة تقدمه، لا تقويمًا يجري أثناء التعلم وتُستثمر نتائجه لتعديل التدريس وتقديم الدعم.', remediation: 'ميّز بين من يراقب التقدم (المتعلم) وبين ما يُفعل بنتائج التقويم (تعديل التدريس والدعم).', theoryId: 'skinner' },
          3: { id: 'formative-vs-differentiation', patternId: 'formative-vs-differentiation', label: 'الخلط بين التقويم وتنويع التعليم', feedback: 'تنويع الطرق والمهام يراعي اختلاف الحاجات، لكنه لا يعرّف التقويم التكويني؛ فالتعريف يركز على تقويم أثناء التعلم واستثمار نتائجه.', remediation: 'أكمل العبارة: التقويم التكويني يحدث أثناء التعلم، وتُستخدم نتائجه من أجل ماذا؟', theoryId: 'skinner' },
        },
      },
      'extra-04': {
        conceptId: 'formative-assessment', partnerQuestionId: 'concept-term-15',
        errors: {
          1: { id: 'formative-assessment-modality', patternId: 'formative-as-modality', label: 'خلط الصفة بطريقة التقويم', feedback: 'تظن أن الشفهي وحده يجعل التقويم تكوينيًا؛ لكن الصفة ترتبط باستثمار النتائج، لا بطريقة طرح السؤال.', remediation: 'بعد تقويم شفهي، دوّن تعديلًا واحدًا ستجريه استنادًا إلى الإجابات.', theoryId: 'skinner' },
          2: { id: 'formative-assessment-timing', patternId: 'formative-as-timing-only', label: 'اعتبار التوقيت كافيًا', feedback: 'تظن أن إجراء التقويم في منتصف الحصة يكفي؛ لكن التوقيت وحده لا يجعله تكوينيًا ما لم تقُد نتائجه إلى دعم أو تعديل.', remediation: 'تخيّل نتيجة ظهرت في منتصف الحصة، ثم اكتب دعمًا أو تعديلًا واحدًا ستقدّمه بناءً عليها.', theoryId: 'skinner' },
          3: { id: 'formative-assessment-grading', patternId: 'formative-as-grading', label: 'مساواة التقويم بمنح نقطة', feedback: 'تظن أن منح نقطة من 20 يحقق التقويم التكويني؛ لكن قيمته تظهر حين تُستثمر النتائج لتعديل المسار.', remediation: 'إلى جانب النقطة، اكتب خطوة تعليمية واحدة ستغيّرها وفق ما كشفته النتائج.', theoryId: 'skinner' },
        },
      },
      'extra-09': {
        conceptId: 'scaffolding-zpd', partnerQuestionId: 'learning-01',
        errors: {
          0: { id: 'scaffold-permanent-substitution', patternId: 'scaffold-substitution', label: 'الخلط بين الدعم المؤقت والشرح الدائم', feedback: 'يجعل هذا الخيار المساعدة دائمة وتقوم مقام المتعلم، بينما السقالة تقل تدريجيًا مع ازدياد استقلاليته.', remediation: 'أكمل العبارة: «تُسحب السقالة تدريجيًا كلما…» ثم اربطها باستقلالية المتعلم.', theoryId: 'piaget' },
          1: { id: 'scaffold-final-assessment', patternId: 'scaffold-vs-summative', label: 'الخلط بين السقالة والتقويم النهائي', feedback: 'الاختبار النهائي يقيس التعلم، أما السقالة فهي مساعدة مؤقتة تتيح إنجاز المهمة.', remediation: 'صنّف كلًّا منهما بحسب وظيفته: هل يساعد على إنجاز المهمة أم يقيس النتيجة؟', theoryId: 'piaget' },
          3: { id: 'scaffold-punishment-confusion', patternId: 'support-as-punishment', label: 'الخلط بين الدعم والعقاب', feedback: 'العقاب لا يقدّم المساعدة المؤقتة التي تتيح إنجاز المهمة داخل منطقة النمو القريبة.', remediation: 'أعد صياغة وظيفة السقالة بعبارة «دعم مؤقت» ثم اشرح متى يتناقص.', theoryId: 'piaget' },
        },
      },
      'learning-01': {
        conceptId: 'scaffolding-zpd', partnerQuestionId: 'extra-09',
        errors: {
          0: { id: 'zpd-punishment-as-support', patternId: 'support-as-punishment', label: 'الخلط بين الدعم والعقاب', feedback: 'يفترض هذا الاختيار أن تكرار العقاب يساعد على التقدم؛ لكن دعم منطقة النمو القريبة مساعدة ملائمة ومؤقتة، لا عقابًا عند الخطأ.', remediation: 'ميّز في موقف تعليمي بين تدخل يقدّم مساعدة مؤقتة وتدخل يكرر العقاب.', theoryId: 'skinner' },
          2: { id: 'zpd-no-mediation-needed', patternId: 'mediation-absent', label: 'اعتقاد أن الاستقلال يعني غياب المساعدة', feedback: 'ترك المتعلم بلا وسيط يلغي المساعدة؛ والهدف هو تقديم مساعدة ملائمة ومؤقتة تنقل المتعلم نحو الاستقلال.', remediation: 'حدّد مساعدة مؤقتة واحدة يمكن تقديمها قبل أن يعمل المتعلم باستقلال.', theoryId: 'vygotsky' },
          3: { id: 'zpd-support-as-substitution', patternId: 'scaffold-substitution', label: 'الخلط بين المساندة وأداء المهمة بدل المتعلم', feedback: 'حل المهمة بدل المتعلم لا ينقله نحو الاستقلال؛ فالمساعدة تهدف إلى تقدمه بنفسه مع سحب الدعم تدريجيًا.', remediation: 'حوّل الحل المباشر إلى تلميح واحد، ثم اطلب من المتعلم إكمال الخطوة التالية بنفسه.', theoryId: 'vygotsky' },
        },
      },
      'strategy-02': {
        conceptId: 'pedagogical-differentiation', partnerQuestionId: 'extra-08',
        errors: {
          0: { id: 'separate-daily-plans', patternId: 'differentiation-as-isolation', label: 'الخلط بين التمايز والعزل الفردي', feedback: 'يفترض هذا الخيار أن لكل متعلم درسًا منفصلًا كليًا؛ لكن التمايز يتيح مداخل متعددة نحو هدف واضح، لا عزلة فردية.', remediation: 'أعد صياغة الخطة بهدف واحد، ثم اقترح مدخلين مختلفين للوصول إليه.', theoryId: 'bruner' },
          1: { id: 'automatic-goal-lowering', patternId: 'differentiation-as-lowering-goals', label: 'الخلط بين التمايز وخفض التوقعات', feedback: 'يجعل هذا الخيار خفض الأهداف قاعدة دائمة؛ بينما التمايز لا يعني خفضًا آليًا للانتظارات.', remediation: 'حوّل الهدف إلى دعم مختلف، مع إبقاء الهدف المشترك كما هو.', theoryId: 'bruner' },
          3: { id: 'unbounded-choice', patternId: 'choice-without-shared-criteria', label: 'الخلط بين الاختيار والاختيار بلا معيار', feedback: 'ترك الاختيار بلا معيار لا يضمن مدخلًا نحو هدف واضح؛ فالاختيار هنا ينفصل عن الغاية المشتركة.', remediation: 'قدّم خيارين وحدّد معيارًا مشتركًا يبيّن كيف يخدم كل خيار الهدف.', theoryId: 'bruner' },
        },
      },
      'extra-08': {
        conceptId: 'pedagogical-differentiation', partnerQuestionId: 'strategy-02',
        errors: {
          1: { id: 'differentiate-goal-without-diagnosis', patternId: 'differentiation-as-lowering-goals', label: 'الخلط بين التمايز وتغيير الهدف', feedback: 'يفترض هذا الاختيار أن التمايز يعني وضع هدف مختلف لكل متعلم من دون تشخيص؛ بينما يكيّف التمايز الطريق أو الدعم مع الحفاظ على هدف التعلم.', remediation: 'اكتب أولًا هدفًا مشتركًا، ثم حدّد الحاجة التي تستدعي تغيير الوسيلة أو الدعم.', theoryId: 'bloom' },
          2: { id: 'equate-difficulty-with-lower-value', patternId: 'support-as-lower-value', label: 'اعتبار دعم المتعثر تقليلًا لقيمة التعلم', feedback: 'يفترض هذا الاختيار أن المتعلم المتعثر ينبغي أن يحصل دائمًا على نشاط أقل قيمة؛ ويمكن تغيير مستوى الدعم مع الحفاظ على معنى التعلم والهدف.', remediation: 'حوّل النشاط إلى خطوة أسهل أو أضف دعمًا، ثم تحقّق من بقاء الهدف نفسه.', theoryId: 'bloom' },
          3: { id: 'equate-differentiation-with-isolation', patternId: 'differentiation-as-isolation', label: 'الخلط بين التمايز والعزل', feedback: 'يفترض هذا الاختيار أن تلبية الحاجة تقتضي عزل المتعلم؛ لكن التمايز يكيّف الطريق أو الدعم ولا يعزل المتعلم عن هدف التعلم.', remediation: 'اقترح دعمًا أو وسيلة مختلفة داخل المهمة المشتركة بدل فصل المتعلم عنها.', theoryId: 'bloom' },
        },
      },
    },
  };
})();
