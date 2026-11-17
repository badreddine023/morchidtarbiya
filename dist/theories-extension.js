window.MORCHID_DATA.theories=[
 {id:'piaget',name_ar:'بياجيه',proponent_ar:'جان بياجيه',summary_ar:'يرى التعلم بناءً نشطًا يمر عبر الاستيعاب والملاءمة والتوازن، مع مراعاة البنى النمائية للمتعلم.',key_concepts:['الاستيعاب','الملاءمة','التوازن','البناء النشط'],related_domains:['learning','psychology']},
 {id:'vygotsky',name_ar:'فيغوتسكي',proponent_ar:'ليف فيغوتسكي',summary_ar:'يبرز دور اللغة والتفاعل والوساطة الاجتماعية ومنطقة النمو القريبة في انتقال المتعلم من المساعدة إلى الاستقلال.',key_concepts:['منطقة النمو القريبة','السقالة','الوساطة','التفاعل'],related_domains:['learning','pedagogy']},
 {id:'bloom',name_ar:'بلوم',proponent_ar:'بنيامين بلوم',summary_ar:'تصنيف يساعد على تنويع الأهداف والأسئلة من التذكر والفهم إلى التحليل والتقويم والإبداع.',key_concepts:['التذكر','الفهم','التطبيق','التحليل','التقويم','الإبداع'],related_domains:['pedagogy','assessment']},
 {id:'bruner',name_ar:'برونر',proponent_ar:'جيروم برونر',summary_ar:'التعلم اكتشاف موجه، وتتدرج المعرفة في تمثيلات عملية وصورية ورمزية مع العودة الحلزونية إلى المفاهيم.',key_concepts:['الاكتشاف','السقالة','المنهاج الحلزوني','التمثيلات'],related_domains:['learning','didactics']},
 {id:'ausubel',name_ar:'أوزوبل',proponent_ar:'دافيد أوزوبل',summary_ar:'يصبح التعلم ذا معنى حين ترتبط المعرفة الجديدة بالبنية المعرفية السابقة، وتساعد المنظمات المتقدمة على بناء هذا الربط.',key_concepts:['التعلم ذو المعنى','المكتسبات القبلية','المنظم المتقدم'],related_domains:['learning','didactics']},
 {id:'bandura',name_ar:'باندورا',proponent_ar:'ألبرت باندورا',summary_ar:'التعلم الاجتماعي يتم عبر الملاحظة والنمذجة والتوقعات والكفاءة الذاتية داخل تفاعل متبادل بين الفرد والبيئة والسلوك.',key_concepts:['الملاحظة','النمذجة','الكفاءة الذاتية','التعلم الاجتماعي'],related_domains:['psychology','pedagogy']},
 {id:'kolb',name_ar:'كولب',proponent_ar:'دافيد كولب',summary_ar:'دورة التعلم الخبراتي تربط التجربة بالتأمل وبناء المفهوم ثم التجريب في وضعية جديدة.',key_concepts:['الخبرة','التأمل','التجريد','التجريب'],related_domains:['learning','didactics']},
 {id:'skinner',name_ar:'سكينر',proponent_ar:'بورهوس سكينر',summary_ar:'تركز السلوكية الإجرائية على السلوك القابل للملاحظة والتعزيز والتدرج والتغذية الراجعة.',key_concepts:['التعزيز','السلوك الملاحظ','التدرج','الاستجابة'],related_domains:['psychology','assessment']},
 {id:'rogers',name_ar:'روجرز',proponent_ar:'كارل روجرز',summary_ar:'التعلم الإنساني يحتاج إلى أمان نفسي وعلاقة قائمة على القبول والتعاطف وإتاحة الاختيار للمتعلم.',key_concepts:['الأمان النفسي','التعاطف','القبول','التعلم المتمركز حول الشخص'],related_domains:['psychology','sociology']},
 {id:'integration',name_ar:'بيداغوجيا الإدماج',proponent_ar:'كزافييه روجيرس',summary_ar:'تدعو إلى تعبئة موارد متعددة داخل وضعية مركبة ودالة، مع تقويم الملاءمة والاكتمال والدقة.',key_concepts:['الموارد','التعبئة','الوضعية الدالة','المعايير'],related_domains:['curriculum','pedagogy','assessment']}
];
(()=>{
 const D=window.MORCHID_DATA;
 const hash=value=>{let result=2166136261;for(let i=0;i<value.length;i++)result=Math.imul(result^value.charCodeAt(i),16777619);return result>>>0};
 const shuffle=(items,seed)=>{const out=[...items];let state=seed||1;for(let i=out.length-1;i>0;i--){state=(Math.imul(state,1664525)+1013904223)>>>0;const j=state%(i+1);[out[i],out[j]]=[out[j],out[i]]}return out};
 const answerCounts=[0,0,0,0];
 const originalCorrectAnswers=D.qcm.map(q=>q.options[q.answer]).filter(Boolean);
 [...D.qcm].sort((a,b)=>hash(a.id)-hash(b.id)).forEach(q=>{
  const oldOptions=[...q.options];
  const oldAnswer=q.answer;
  const correct=oldOptions[oldAnswer];
  q.legacyOptions=q.legacyOptions||oldOptions;
  q.legacyAnswer=oldAnswer;
  const distractors=[...new Set(oldOptions.filter((_,index)=>index!==oldAnswer))];
  for(const candidate of originalCorrectAnswers){if(distractors.length>=3)break;if(candidate!==correct&&!distractors.includes(candidate))distractors.push(candidate)}
  while(distractors.length<3){const candidate=`خيار آخر لا يعبّر عن مفهوم «${q.concept}».`;if(!distractors.includes(candidate))distractors.push(candidate);else distractors.push(`${candidate} (${distractors.length+1})`)}
  const least= Math.min(...answerCounts);
  const available=answerCounts.map((count,index)=>count===least?index:-1).filter(index=>index>=0);
  const answer=available[hash(q.id)%available.length];
  const options=shuffle(distractors,hash(`${q.id}:options`));
  options.splice(answer,0,correct);
  q.options=options;
  q.answer=answer;
  answerCounts[answer]++;
 });
 const byDomain={learning:'piaget',psychology:'vygotsky',pedagogy:'bloom',assessment:'skinner',didactics:'bruner',curriculum:'integration',sociology:'rogers',innovation:'bruner'};
 const byText=[['بياجي','piaget'],['فيجوتسكي','vygotsky'],['بلوم','bloom'],['برونر','bruner'],['أوزوبل','ausubel'],['باندورا','bandura'],['كولب','kolb'],['سكينر','skinner'],['روجرز','rogers'],['إدماج','integration'],['كفاية','integration'],['تقويم','skinner']];
 const find=q=>{const text=`${q.question} ${q.concept} ${q.explanation}`;const hit=byText.find(([key])=>text.includes(key));return [hit?.[1]||byDomain[q.domain]||'bloom']};
 D.qcm.forEach(q=>q.theory_ids=q.theory_ids||find(q));
 D.situations.forEach(s=>s.theory_ids=s.theory_ids||find({question:s.title,concept:s.theory,explanation:s.analysis,domain:s.domain}));
 D.flashcards.forEach(c=>c.theory_ids=c.theory_ids||find({question:c.front,concept:c.domain,explanation:c.back,domain:c.domain}));
 D.theories.forEach(t=>{t.question_ids=D.qcm.filter(q=>q.theory_ids.includes(t.id)).map(q=>q.id);t.situation_ids=D.situations.filter(s=>s.theory_ids.includes(t.id)).map(s=>s.id)});
})();
