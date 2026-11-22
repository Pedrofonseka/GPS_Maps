#!/usr/bin/env python3
"""Sincroniza os motores comuns (comum/*.js) para dentro das apps (ficheiro único).
Em cada app, o bloco fica entre «/* @comum:<nome> vX.Y …» e «/* @fim:<nome> */».
Uso:  python3 tools/sync_comum.py          → copia para todas as apps que têm o bloco
      python3 tools/sync_comum.py --check  → só verifica (lista versões, sai com erro se alguma estiver desatualizada)"""
import re,sys,os,glob
G=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APPS=['relat','avalias','regi','expropria','ava','full','revip']
check='--check' in sys.argv;bad=0
for path in sorted(glob.glob(os.path.join(G,'comum','*.js'))):
    nome=os.path.basename(path)[:-3];src=open(path,encoding='utf8').read()
    m=re.match(r'/\* @comum:'+nome+r' v([\d.]+)',src);assert m,f'{path}: falta o cabeçalho @comum'
    ver=m.group(1);pat=re.compile(r'/\* @comum:'+nome+r' v([\d.]+)[\s\S]*?/\* @fim:'+nome+r' \*/\n?')
    for app in APPS:
        f=os.path.join(G,app,'index.html')
        if not os.path.exists(f):continue
        s=open(f,encoding='utf8').read();mm=list(pat.finditer(s))
        if not mm:continue
        assert len(mm)==1,f'{app}: mais de um bloco {nome}'
        igual=mm[0].group(0).rstrip('\n')==src.rstrip('\n')
        print(f'{nome} v{ver} → {app}: {"atualizado" if igual else ("DESATUALIZADO (v"+mm[0].group(1)+")" if check else "copiado")}')
        if not igual:
            if check:bad+=1
            else:
                s=s[:mm[0].start()]+src.rstrip('\n')+'\n'+s[mm[0].end():];open(f,'w',encoding='utf8').write(s)
sys.exit(1 if bad else 0)
